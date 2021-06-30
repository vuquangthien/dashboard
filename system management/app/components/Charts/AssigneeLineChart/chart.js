import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4langVn from '@amcharts/amcharts4/lang/vi_VN';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import connect from 'react-redux/lib/connect/connect';

import {
  AGGTYPES,
  FUNCTION_PERMISSIONS_MAPPING,
} from '../../../utils/constants';
import { formatDayInChart } from '../../../utils/common';

import { renderAssigneeLineChartFinish } from '../../../containers/DashBoardPage/actions';

// PA 2
// import { configThemeFunctionSwitchObjColor } from '../../../configureTheme';
import {
  makeSelectCurrentUser,
  makeSelectCurrentColorListChart,
} from '../../../containers/AdminPage/selectors';

// const valueTheme = getKeyColorThemeFromLocalStorage('@theme');
// const configTheme = configThemeFunctionSwitchObjColor(valueTheme);
export function AssigneeLineChart(props) {
  const {
    id,
    query,
    data,
    chartTitle,
    className,
    currentUser,
    onRenderAssigneeLineChartFinish,
    isLoading,
    currentColorListChart,
    ...rest
  } = props;

  useEffect(() => {
    if (isLoading) {
      return () => {};
    }
    // // TUANTRAN PERFORMANCE DASHBOARD CHART :
    // am4core.options.queue = true;
    // am4core.options.onlyShowOnViewport = true;
    // // het - TUANTRAN PERFORMANCE DASHBOARD CHART.

    const chart = am4core.create(id, am4charts.XYChart);

    chart.logo.disabled = true;
    const title = chart.titles.create();
    title.text = chartTitle;
    title.fontSize = 20;
    title.marginBottom = 10;
    title.fontWeight = 'bold';
    chart.hiddenState.properties.opacity = 0;
    chart.language.locale = am4langVn;
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
    const dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    // TT
    dateAxis.title.text = `Thống kê theo ` + AGGTYPES[query.aggType].toLowerCase();
    dateAxis.fontSize = 12;
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dataFields.category = 'date';
    dateAxis.renderer.minGridDistance = 40;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Số lượng';
    valueAxis.fontSize = 12;
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    // TT - IS 744 - TD : (TRỤC TUNG) làm tròn các số - thành số nguyên + không được hiện số âm
    valueAxis.maxPrecision = 0;
    valueAxis.min = 0;


    const assignees = Object.keys(_.groupBy(data, 'label'));

    function createSeries(value, name) {
      // Create series
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = 'date';
      series.name = name;
      series.tooltipText = '{valueY.value}';
      series.strokeWidth = 2;
      series.bullets.push(new am4charts.CircleBullet());
      // bullet.interactionsEnabled = false;
      // bullet.dy = 30;
      // bullet.label.text = '{valueY}';
      // bullet.label.fill = am4core.color('#ffffff');

      // TT - CHANGE COLOR : DASHBOARD
      // series.fill = am4core.color('green');  // MÀU CỘT
      // series.color = am4core.color('red');      // ???
      series.fillOpacity = 0; // OPACITY - LỌC MÀU BG - CỘT.

      // series.troke = am4core.color('blue');  // MÀU ĐƯỜNG VIỀN
      // series.trokeWidth = 100;               // RỘNG ĐƯỜNG VIỀN
      // series.trokeOpacity = 0.3;                // ĐỘ MỜ ĐƯỜNGVIỀN
      series.hiddenState.properties.opacity = 0; // ???
    }
    for (let i = 0; i < assignees.length; i += 1) {
      const assigne = assignees[i];
      createSeries(assigne, assigne);
    }
    chart.data = parseData(data, assignees);

    chart.cursor = new am4charts.XYCursor();

    chart.legend = new am4charts.Legend();
    chart.legend.height = 100;
    chart.legend.position = 'bottom';
    // TT - RESPONSIVE  LEGEND - SCREEN : max 5 rows + scroll
    chart.legend.maxHeight = 120;
    chart.legend.scrollable = true;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.exportable = false;
    chart.events.on('ready', () => {
      dateAxis.zoomToIndexes(chart.data.length - 7, chart.data.length);
    });

    // TT - BUTTON ZOOM
    chart.zoomOutButton.background.fill = am4core.color(
      currentColorListChart[12],
    );
    chart.zoomOutButton.background.states.getKey(
      'hover',
    ).properties.fill = am4core.color(currentColorListChart[13]);

    // TT - RENDER CHART FINISH : REMOVE LAYOUT LOADING SPINNER
    chart.events.on('ready', function(ev) {
      onRenderAssigneeLineChartFinish();
    });

    // TT - TEST
    // return () => chart && chart.dispose();
  }, [data, isLoading, currentColorListChart]);

  const parseData = assignees => {
    if (!data || data.length === 0) return [];
    const groupedData = _.groupBy(data, 'timeChart');
    // TT
    const result = Object.keys(groupedData).map(key => ({
      date: `${formatDayInChart(
        key,
        query.aggType,
      )}`,
      ...Object.assign(
        {},
        ...assignees.map(assigne => {
          const assigneData = groupedData[key].find(
            group => group.label === assigne.label,
          );
          return {
            [assigne.label]: assigneData ? assigneData.count : 0,
          };
        }),
      ),
    }));
    return result;
  };

  return (
    <>
      <div className={className} {...rest} id={id} />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentColorListChart: makeSelectCurrentColorListChart(),
});
function mapDispatchToProps(dispatch) {
  return {
    onRenderAssigneeLineChartFinish: () =>
      dispatch(renderAssigneeLineChartFinish()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

AssigneeLineChart.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  chartTitle: PropTypes.string,
  query: PropTypes.object,
  className: PropTypes.object,
  currentUser: PropTypes.object,
  onRenderAssigneeLineChartFinish: PropTypes.func,
  isLoading: PropTypes.bool,
  currentColorListChart: PropTypes.array,
};

export default compose(
  withConnect,
  memo,
)(AssigneeLineChart);
