import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SearchBox from '../SearchBox';
import TaskColumnChart from './chart';
import LoadingChart from '../../LoadingChart';

export function TaskColumnSection(props) {
  const {
    id,
    data,
    classes,
    onSearch,
    onOpenFullChart,
    currentUser,
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
        <TaskColumnChart
          currentUser={currentUser}
          className={classes.chart}
          data={data}
          query={query}
          id={id}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

TaskColumnSection.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  classes: PropTypes.object,
  currentUser: PropTypes.object,
  onSearch: PropTypes.func,
  onOpenFullChart: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default memo(TaskColumnSection);
