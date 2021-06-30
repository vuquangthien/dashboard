import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import connect from 'react-redux/lib/connect/connect';
import SearchBox from '../SearchBox';
import { makeSelectMinistries } from '../../../containers/AdminPage/selectors';
import { getMinistriesByRole } from '../../../containers/AdminPage/actions';
import SourceTypePieChart from './chart';
import LoadingChart from '../../LoadingChart';

export function SourceTypePieSection(props) {
  const {
    id,
    data,
    classes,
    onSearch,
    onGetMinistries,
    onOpenFullChart,
    isLoading,
  } = props;

  useEffect(() => {
    onGetMinistries();
  }, []);

  const handleOpenFullChart = newQuery => {
    onOpenFullChart(id, newQuery);
  };

  return (
    <>
      <SearchBox
        classes={classes}
        onSearch={onSearch}
        onOpenFullChart={handleOpenFullChart}
      />
      {/* TT - LOADING LAYOUT */}
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        {isLoading && <LoadingChart />}
        <SourceTypePieChart
          className={classes.chart}
          id={id}
          data={data}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  ministries: makeSelectMinistries(),
});

function mapDispatchToProps(dispatch) {
  return {
    // TUANTRAN - HOI LAI CHO NAY - getMinistries - getMinistriesByRole
    onGetMinistries: () => dispatch(getMinistriesByRole()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

SourceTypePieSection.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  onSearch: PropTypes.func,
  classes: PropTypes.object,
  onGetMinistries: PropTypes.func,
  onOpenFullChart: PropTypes.func,
};

export default compose(
  withConnect,
  memo,
)(SourceTypePieSection);
