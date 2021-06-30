import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import connect from 'react-redux/lib/connect/connect';
import {
  makeSelectMinistries,
  makeSelectCurrentUser,
  makeSelectIsLoadingMinistriesByRole,
  makeSelectCurrentColorListChart,
} from '../../../containers/AdminPage/selectors';
import { getMinistries } from '../../../containers/AdminPage/actions';
import { renderSourceTypePieChartFinish } from '../../../containers/DashBoardPage/actions';
import { FUNCTION_PERMISSIONS_MAPPING } from '../../../utils/constants';

const parseData = (data, ministries) => {
  if (!data || data.length === 0) return [];
  const groupedData = _.groupBy(data, 'label');

  return ministries.map(key => {
    let count = 0;
    if (groupedData[key.ministryCode]) {
      groupedData[key.ministryCode].forEach(group => {
        count += group.count;
      });
    } else {
      count = 0;
    }

    // TT - MAP DISPLAY NAME : MINISTRIES
    switch (key.ministryCode) {
      case 'BLDTBXH': key.ministryName = 'BLĐ-TB&XH'; break;
      case 'BGDDT': key.ministryName = 'BGD&ĐT'; break;
      case 'BKHDT': key.ministryName = 'BKH&ĐT'; break;
      case 'BGTVT': key.ministryName = 'BGTVT'; break;
      case 'BCA': key.ministryName = 'BCA'; break;
      case 'BYT': key.ministryName = 'BYT'; break;
      case 'BTP': key.ministryName = 'BTP'; break;
      case 'BTC': key.ministryName = 'BTC'; break;
      case 'BNV': key.ministryName = 'BNV'; break;    
      default:
        break;
    }

    return {
      label: `${key.ministryName}`,
      count,
    };
  });
};

export function SourceTypePieChart(props) {
  const {
    id,
    data,
    className,
    ministries,
    onRenderSourceTypePieChartFinish,
    currentUser,
    isLoading,
    isLoadingMinistriesByRole,
    currentColorListChart,
  } = props;

  useEffect(() => {
    // TT
    if (isLoading || isLoadingMinistriesByRole) {
      return () => {};
    }
    const chart = am4core.create(id, am4charts.PieChart);
    chart.logo.disabled = true;
    if (ministries) {
      const title = chart.titles.create();
      title.text = 'Biểu đồ tích hợp theo các Bộ ngành';
      title.fontSize = 20;
      chart.paddingTop = 20;
      title.fontWeight = 'bold';
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      chart.data = parseData(data, ministries);
      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'count';
      pieSeries.dataFields.category = 'label';

      pieSeries.slices.template.tooltipText = `{category} ({value.value}): {value.percent.formatNumber('#.#')}%`;
      pieSeries.labels.template.text = `{category} ({value.value}): {value.percent.formatNumber('#.#')}%`;
      pieSeries.colors.list = currentColorListChart;
      pieSeries.fillOpacity = 1; // OPACITY - LỌC MÀU BG - CỘT.
      pieSeries.trokeOpacity = 1; // ĐỘ MỜ ĐƯỜNGVIỀN
      // PHAN 2 -
      chart.legend = new am4charts.Legend();
      chart.legend.position = 'bottom';
      chart.legend.maxHeight = 120;
      chart.legend.scrollable = true;

      chart.legend.valueLabels.template.text = `({value}): {value.percent.formatNumber('#.0')}%`;

      chart.exporting.menu = new am4core.ExportMenu();
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
          e =>
            `${e}` === FUNCTION_PERMISSIONS_MAPPING.DASHBOARD_PAGE.EXPORT_FILE,
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
      chart.colors.list = currentColorListChart;
      // TT - RESPONSIVE : autoResize : TRUE
      chart.svgContainer.autoResize = true;
      chart.svgContainer.measure();
      chart.responsive.enabled = true;
      // TT - ẨN CHÚ THÍCH TRÊN BIỂU ĐỒ - VỚI MÀN HÌNH BÉ
      chart.responsive.rules.push({
        relevant: function(target){
          if (target.pixelWidth <= 600) {
            return true;
          }
          return false;
        },
        state: function(target, stateId){
          if (target instanceof am4charts.PieSeries) {
            var state = target.states.create(stateId);

            var lableState = target.labels.template.states.create(stateId);
            lableState.properties.disabled = true;

            var tickState = target.ticks.template.states.create(stateId);
            tickState.properties.disabled = true;
            
            return state;
          }

          return null;
        }
      });


      // TT - CHANGE COLOR : DASHBOARD
      // chart.fill = am4core.color('green');  // MÀU CỘT
      // chart.color = am4core.color('red');      // ???
      chart.fillOpacity = 1; // OPACITY - LỌC MÀU BG - CỘT.
      chart.trokeOpacity = 1; // ĐỘ MỜ ĐƯỜNGVIỀN
    }

    // TT - RENDER CHART FINISH : REMOVE LAYOUT LOADING SPINNER
    chart.events.on('ready', function(ev) {
      onRenderSourceTypePieChartFinish();
    });

    // TT - TEST
    // return () => chart && chart.dispose();
  }, [
    data,
    ministries,
    isLoading,
    isLoadingMinistriesByRole,
    currentColorListChart,
  ]);

  return <div className={className} id={id} />;
}

const mapStateToProps = createStructuredSelector({
  ministries: makeSelectMinistries(),
  currentUser: makeSelectCurrentUser(),
  isLoadingMinistriesByRole: makeSelectIsLoadingMinistriesByRole(),
  currentColorListChart: makeSelectCurrentColorListChart(),
});

function mapDispatchToProps(dispatch) {
  return {
    // onGetMinistries: () => dispatch(getMinistries()),
    onRenderSourceTypePieChartFinish: () =>
      dispatch(renderSourceTypePieChartFinish()),
  };
}
SourceTypePieChart.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  className: PropTypes.object,
  currentUser: PropTypes.object,
  ministries: PropTypes.array,
  onRenderSourceTypePieChartFinish: PropTypes.func,
  isLoading: PropTypes.bool,
  isLoadingMinistriesByRole: PropTypes.bool,
  currentColorListChart: PropTypes.array,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SourceTypePieChart);
