/**
 *
 * Loading
 *
 */

import React, { memo } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '../../utils/styles';

// export default
function LoadingChart() {
  const classes = useStyles();
  return (
    <div
      className={classes.bgColorLoadingChartBody}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '800',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
      }}
    >
      <CircularProgress
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          zIndex: '801',
          marginLeft: '-20px',
          marginTop: '-20px',
        }}
      />
      {/* <h4 style={{ position: 'absolute', top: '60%', width: '100%', textAlign: 'center' , color: configTheme.primaryColorTextLoadingChart }} >Loading Chart...</h4> */}
    </div>
  );
}

export default memo(LoadingChart);