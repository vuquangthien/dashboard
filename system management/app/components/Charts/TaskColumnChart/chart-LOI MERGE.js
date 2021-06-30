import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import _ from 'lodash';
import am4langVn from '@amcharts/amcharts4/lang/vi_VN';
import connect from 'react-redux/lib/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  getCountByWorkflowType,
  formatDayInChart,
} from '../../../utils/common';
import {
  AGGTYPES,
  TASK_CODE,
  FUNCTION_PERMISSIONS_MAPPING,
} from '../../../utils/constants';

import { renderTaskColumnChartFinish } from '../../../containers/DashBoardPage/actions';

// PA 2
// import { configThemeFunctionSwitchObjColor } from '../../../configureTheme';
import {
  makeSelectCurrentUser,
  makeSelectCurrentColorListChart,
} from '../../../containers/AdminPage/selectors';

// const valueTheme = getKeyColorThemeFromLocalStorage('@theme');
// const configTheme = configThemeFunctionSwitchObjColor(valueTheme);

// FUNCTION - PHU : 1
const createSeries = (chart, value, name) => {
  // PHẦN 1 :
  // Create series
  const series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = value;
  series.dataFields.categoryX = 'date';
  series.tooltipText = '{valueY.value}';
  series.name = name;
  // TT - CHANGE COLOR : DASHBOARD
  // series.fill = am4core.color('green');  // MÀU CỘT
  // series.color = am4core.color('red');      // ???
  series.fillOpacity = 1; // OPACITY - LỌC MÀU BG - CỘT.

  // series.troke = am4core.color('blue');  // MÀU ĐƯỜNG VIỀN
  // series.trokeWidth = 100;               // RỘNG ĐƯỜNG VIỀN
  // series.trokeOpacity = 1;               // ĐỘ MỜ ĐƯỜNGVIỀN
  // series.hiddenState.properties.opacity = 1;   // ???

  const bullet = series.bullets.push(new am4charts.LabelBullet());
  bullet.interactionsEnabled = false;
  bullet.dy = 15;
  bullet.label.text = '{valueY}';
  bullet.label.fill = am4core.color('#ffffff');

  // TT
  // bullet.fill = am4core.color('red');
  // bullet.troke = am4core.color('red');
  // bullet.color = am4core.color('red');
  // bullet.trokeOpacity = 1;
  // bullet.trokeWidth = 2;
  bullet.fillOpacity = 1;
  // bullet.hiddenState.properties.opacity = 0;
};

// FUNCTION - PHU : 2
const parseData = (data, query) => {
  if (!data || data.length === 0) return [];

  const groupedData = _.groupBy(data, 'timeChart');
  const result = Object.keys(groupedData).map(key => ({
    date: `${AGGTYPES[query.aggType]} ${formatDayInChart(key, query.aggType)}`,
    receiveTask: getCountByWorkflowType(groupedData[key], {
      TASK_CODE: TASK_CODE.RECEIVE_REQUEST,
    }),
    approvalTask: getCountByWorkflowType(groupedData[key], {
      TASK_CODE: TASK_CODE.APPRORVE_REQUEST,
    }),
    handleTask: getCountByWorkflowType(groupedData[key], {
      TASK_CODE: TASK_CODE.HANDLE_REQUEST,
    }),
  }));

  return result;
};

// FUNCTION - PHU : 3
function generateChart(
  id,
  data,
  className,
  query,
  currentUser,
  onRenderTaskColumnChartFinish,
  isLoading,
  currentColorListChart,
) {
  const chart = am4core.create(id, am4charts.XYChart);
  chart.svgContainer.autoResize = false;
  chart.svgContainer.measure();
  chart.logo.disabled = true;
  const title = chart.titles.create();
  title.text = 'Biểu đồ xử lý hồ sơ yêu cầu tích hợp';
  title.fontSize = 20;
  title.fontWeight = 'bold';
  title.marginBottom = 5;

  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

  chart.language.locale = am4langVn;
  chart.data = parseData(data, query);
  chart.exporting.menu = new am4core.ExportMenu();

  // TT - MÀU NỀN CHO CHART
  // chart.background.fill = '#0f0';
  // chart.background.opacity = '0.5';

  // TT - CHANGE COLOR : DASHBOARD
  chart.colors.list = currentColorListChart;

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
  const dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.dataFields.category = 'date';
  dateAxis.renderer.minGridDistance = 40;
  dateAxis.fontSize = 12;

  const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.title.text = `Số lượng yêu cầu tích hợp`;
  yAxis.min = 0;

  createSeries(chart, 'receiveTask', 'Tiếp nhận');
  createSeries(chart, 'approvalTask', 'Phê duyệt');
  createSeries(chart, 'handleTask', 'Xử lý');
  // Add cursor
  chart.cursor = new am4charts.XYCursor();
  // Add scrollbar
  chart.scrollbarX = new am4core.Scrollbar();
  chart.scrollbarX.exportable = false;
  // Add legend
  chart.legend = new am4charts.Legend();
  chart.legend.position = 'bottom';

  // // Add scrollbar
  // chart.scrollbarX = new am4charts.XYChartScrollbar();
  // chart.scrollbarX.series.push(series1);
  // chart.scrollbarX.series.push(series3);
  // chart.scrollbarX.parent = chart.bottomAxesContainer;

  // TT - BUTTON ZOOM
  // chart.zoomOutButton.background.fill = am4core.color(
  //   currentColorListChart[12],
  // );
  // chart.zoomOutButton.background.states.getKey(
  //   'hover',
  // ).properties.fill = am4core.color(currentColorListChart[13]);


  // TT - RENDER CHART FINISH : REMOVE LAYOUT LOADING SPINNER
  chart.events.on('ready', ev => {
    dateAxis.zoomToIndexes(chart.data.length - 7, chart.data.length);
    onRenderTaskColumnChartFinish();
  });

  return chart;
};

// COMPONENT - BIEU DO :
export function TaskColumnChart(props) {
  const {
    id,
    data,
    className,
    query,
    onRenderTaskColumnChartFinish,
    isLoading,
    currentColorListChart,
  } = props;

  useEffect(() => {
    // TT
    if (isLoading) {
      return () => { };
    }
    console.log('TaskColumnChart DA RENDER.');
    console.log(currentColorListChart,' useEffect TaskColumnChart DA RENDER : ......');
    console.log(props,' useEffect TaskColumnChart DA RENDER : ...... props');
    // // TT PERFORMANCE DASHBOARD CHART :
    // am4core.options.queue = true;
    // am4core.options.onlyShowOnViewport = true;
    // // am4core.options.deferredDelay = 500;
    // // het - TT PERFORMANCE DASHBOARD CHART.
    const chart = generateChart(
      id,
      data,
      className,
      query,
      onRenderTaskColumnChartFinish,
      isLoading,
      currentColorListChart
    );

    // TT - TEST
    // return () => chart && chart.dispose();
  }, [data, isLoading, currentColorListChart]);

  return <div className={className} id={id} />;
}

// //
// const mapStateToProps = createStructuredSelector({
//   currentUser: makeSelectCurrentUser(),
// TT
const mapStateToProps = createStructuredSelector({
  currentColorListChart: makeSelectCurrentColorListChart(),
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  onRenderTaskColumnChartFinish: () => dispatch(renderTaskColumnChartFinish()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

TaskColumnChart.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  className: PropTypes.object,
  // currentUser: PropTypes.object,
  query: PropTypes.object,
  onRenderTaskColumnChartFinish: PropTypes.func,
  isLoading: PropTypes.bool,
  currentColorListChart: PropTypes.array,
};

// const mapStateToProps = createStructuredSelector({
//   currentUser: makeSelectCurrentUser(),
// });

// export default memo(TaskColumnChart)
// const withConnect = connect(mapStateToProps);

// export default compose(
//   withConnect,
//   memo,
// )(TaskColumnChart);
export default compose(
  withConnect,
  memo,
)(TaskColumnChart);
