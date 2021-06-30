import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import _ from 'lodash';
import am4langVn from '@amcharts/amcharts4/lang/vi_VN';
import { compose } from 'redux';
import connect from 'react-redux/lib/connect/connect';
import { createStructuredSelector } from 'reselect';
import {
  getCountByWorkflowType,
  formatDayInChart,
  // getKeyColorThemeFromLocalStorage,
} from '../../../utils/common';
import {
  AGGTYPES,
  FUNCTION_PERMISSIONS_MAPPING,
} from '../../../utils/constants';

import { renderSyncReportColumnChartFinish } from '../../../containers/DashBoardPage/actions';

// PA 2
// import { configThemeFunctionSwitchObjColor } from '../../../configureTheme';

import {
  makeSelectCurrentUser,
  makeSelectCurrentColorListChart,
} from '../../../containers/AdminPage/selectors';
// const valueTheme = getKeyColorThemeFromLocalStorage('@theme');
// const configTheme = configThemeFunctionSwitchObjColor(valueTheme);

// export function SyncReportColumnChart(props) {
//   const {
//     id,
//     data,
//     className,
//     query,
//     currentUser,
//     onRenderSyncReportColumnChartFinish,
//     isLoading,
//   } = props;

export function SyncReportColumnChart(props) {
  const {
    id,
    data,
    className,
    query,
    onRenderSyncReportColumnChartFinish,
    isLoading,
    currentColorListChart,
    currentUser,
  } = props;

  useEffect(() => {
    // TT
    if (isLoading) {
      return () => {};
    }
    // // TT PERFORMANCE DASHBOARD CHART :
    // am4core.options.queue = true;
    // am4core.options.onlyShowOnViewport = true;
    // // het - TT PERFORMANCE DASHBOARD CHART.

    const chart = am4core.create(id, am4charts.XYChart);
    chart.logo.disabled = true;
    const title = chart.titles.create();
    title.text = 'Biểu đồ tích hợp dữ liệu tự động';
    title.fontSize = 20;
    title.fontWeight = 'bold';
    title.marginBottom = 5;

    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.language.locale = am4langVn;
    chart.data = parseData();
    chart.exporting.menu = new am4core.ExportMenu();

    // TT - MÀU NỀN CHO CHART
    // chart.background.fill = '#0f0';
    // chart.background.opacity = '0.5';
    // TT - CHANGE COLOR : DASHBOARD
    chart.colors.list = currentColorListChart;
    // TT - RESPONSIVE : autoResize : TRUE
    chart.svgContainer.autoResize = true;
    chart.svgContainer.measure();
    chart.responsive.enabled = true;

    // chart.exporting.menu.tag = 'div';
    const menu = [];
    if (currentUser && currentUser.actions) {
      // check quyền In
      const checkExportFile = currentUser.actions.find(
        e =>
          `${e}` ===
          FUNCTION_PERMISSIONS_MAPPING.DASHBOARD_PAGE.PRINT_SEARCH_RESULT,
      );
      if (checkExportFile) {
        menu.push({
          type: 'print',
          label: 'In',
        });
      }
      // check quyền xuất ảnh
      const checkExportImage = currentUser.actions.find(
        e => `${e}` === FUNCTION_PERMISSIONS_MAPPING.DASHBOARD_PAGE.EXPORT_FILE,
      );
      if (checkExportImage) {
        menu.push({
          type: 'png',
          label: 'Xuất ảnh',
        });
      }
    }
    chart.exporting.menu.items = [
      {
        label: '...',
        menu,
      },
    ];
    // chart.exporting.menu.items = [
    //   {
    //     label: '...',
    //     menu: [
    //       {
    //         type: 'print',
    //         label: 'In',
    //       },
    //       {
    //         type: 'png',
    //         label: 'Xuất ảnh',
    //       },
    //     ],
    //   },
    // ];

    chart.exporting.menu.className = 'item-menu__exporting';
    chart.exporting.menu.loadDefaultCSS();
    document.getElementsByClassName('item-menu__exporting');

    const dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    // TT
    dateAxis.title.text = `Thống kê theo ` + AGGTYPES[query.aggType].toLowerCase();
    dateAxis.fontSize = 12;
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dataFields.category = 'date';
    dateAxis.renderer.minGridDistance = 40;

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // yAxis.title.text = 'Yêu cầu';
    yAxis.fontSize = 12;
    yAxis.min = 0;
    // TT - IS 744 - TD : (TRỤC TUNG) làm tròn các số - thành số nguyên
    yAxis.maxPrecision = 0;

    function createSeries(value) {
      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = 'date';
      series.tooltipText = '{valueY.value}';
      series.name = 'Số lượng tích hợp tự động';
      // TT - CHANGE COLOR : DASHBOARD
      // series.fill = am4core.color('green');  // MÀU CỘT
      // series.color = am4core.color('red');      // ???
      series.fillOpacity = 1; // OPACITY - LỌC MÀU BG - CỘT.
      // series.troke = am4core.color('blue');  // MÀU ĐƯỜNG VIỀN
      // series.trokeWidth = 100;               // RỘNG ĐƯỜNG VIỀN
      // series.trokeOpacity = 1;               // ĐỘ MỜ ĐƯỜNGVIỀN
      // series.hiddenState.properties.opacity = 0;   // ???

      const bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 15;
      bullet.label.text = '{valueY}';
      bullet.label.fill = am4core.color('#ffffff');
    }
    createSeries('receiveTask');
    // createSeries('approvalTask', 'Phê duyệt');
    // createSeries('handleTask', 'Xử lý');

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.exportable = false;
    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'bottom';
    // TT - RESPONSIVE  LEGEND - SCREEN : max 5 rows + scroll
    chart.legend.maxHeight = 120;
    chart.legend.scrollable = true;

    // TT - BUTTON ZOOM
    chart.zoomOutButton.background.fill = am4core.color(
      currentColorListChart[12],
    );
    chart.zoomOutButton.background.states.getKey(
      'hover',
    ).properties.fill = am4core.color(currentColorListChart[13]);

    // // Add scrollbar
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series1);
    // chart.scrollbarX.series.push(series3);
    // chart.scrollbarX.parent = chart.bottomAxesContainer;
    chart.events.on('ready', () => {
      dateAxis.zoomToIndexes(chart.data.length - 14, chart.data.length);
      onRenderSyncReportColumnChartFinish();
    });

    // TT - TEST
    // return () => chart && chart.dispose();
  }, [data, isLoading, currentColorListChart]);

  const parseData = () => {
    if (!data || data.length === 0) return [];
    const groupedData = _.groupBy(data, 'timeChart');
    // TT
    const result = Object.keys(groupedData).map(key => ({
      date: `${formatDayInChart(
        key,
        query.aggType,
      )}`,
      receiveTask: getCountByWorkflowType(groupedData[key], {
        TASK_CODE: 'counter',
      }),
    }));
    return result;
  };

  return (
    <>
      <div className={className} id={id} />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  // ministries: makeSelectMinistries(),
  currentColorListChart: makeSelectCurrentColorListChart(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRenderSyncReportColumnChartFinish: () =>
      dispatch(renderSyncReportColumnChartFinish()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

SyncReportColumnChart.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  className: PropTypes.object,
  currentUser: PropTypes.object,
  query: PropTypes.object,
  onRenderSyncReportColumnChartFinish: PropTypes.func,
  isLoading: PropTypes.bool,
  currentColorListChart: PropTypes.array,
};

export default compose(
  withConnect,
  memo,
)(SyncReportColumnChart);
