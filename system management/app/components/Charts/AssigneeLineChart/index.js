import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SearchBox from '../SearchBox';
import AssigneeLineChart from './chart';
import LoadingChart from '../../LoadingChart';

export function AssigneeLineSection(props) {
  const {
    id,
    data,
    chartTitle,
    onSearch,
    classes,
    onOpenFullChart,
    isLoading,
  } = props;

  const [query, setQuery] = useState({
    aggType: 'day',
    fromDate: moment().startOf('month'),
    toDate: moment(),
  });

  const handleSearch = newQuery => {
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleOpenFullChart = newQuery => {
    onOpenFullChart(id, newQuery);
  };

  return (
    <>
      <SearchBox
        classes={classes}
        onSearch={handleSearch}
        onOpenFullChart={handleOpenFullChart}
      />
      {/* TT - LOADING LAYOUT */}
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        {isLoading && <LoadingChart />}
        <AssigneeLineChart
          className={classes.chart}
          id={id}
          data={data}
          chartTitle={chartTitle}
          query={query}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

AssigneeLineSection.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  chartTitle: PropTypes.string,
  onSearch: PropTypes.func,
  classes: PropTypes.object,
  onOpenFullChart: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default memo(AssigneeLineSection);
