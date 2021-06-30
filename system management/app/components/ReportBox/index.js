/**
 *
 * ReportBox
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import useStyles from '../../utils/styles';
import Permission from '../Permission';
import { FUNCTION_PERMISSIONS_MAPPING } from '../../utils/constants';
const ReportBox = props => {
  const classes = useStyles();

  // TT : BLOCK NUMBER.
  const { blockNumber } = props;
  const bgColorBlockDetailBodyNumberSelected = `bgColorBlockDetailBodyNumber${blockNumber}`;
  const bgColorBlockDetailFooterNumberSelected = `bgColorBlockDetailFooterNumber${blockNumber}`;

  return (
    <div
      md={3}
      spacing={4}
      // TT
      className={`${classes[bgColorBlockDetailBodyNumberSelected]}`}
      style={{
        borderRadius: '3px',
        padding: '25px 10px',
        width: '32%',
        position: 'relative',
      }}
    >
      {/* <div style={{ padding: 5, zIndex: 999 }}>
        <Typography style={{ color: 'white' }} variant="h4">
          {props.number}
        </Typography>
        <Typography variant="body2" style={{ color: 'white' }}>
          {props.text}
        </Typography>
      </div> */}
      <div
        style={{
          padding: 5,
          zIndex: 999,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* {props.data.indexOf()} */}

        {props.data &&
          props.data
            .sort((a, b) => a.order - b.order)
            .map(d => (
              <div>
                <Typography style={{ color: 'white' }} variant="h4" className={classes.numberInBlockDetailDashboard} >
                  {d.number}
                </Typography>
                <Typography variant="body2" style={{ color: 'white' }} className={classes.textInBlockDetailDashboard}>
                  {d.text}
                </Typography>
              </div>
            ))}
      </div>
      <Permission
        permission={FUNCTION_PERMISSIONS_MAPPING.DASHBOARD_PAGE.VIEW_DETAIL}
      >
        <Box
          // TT
          className={`${
            classes[bgColorBlockDetailFooterNumberSelected]
          } hover-dashboard`}
          style={{
            position: 'absolute',
            textAlign: 'center',
            padding: 'auto',
            display: 'block',
            textDecoration: 'none',
            width: '100%',
            bottom: 0,
            left: 0,
            right: 0,
            cursor: 'pointer',
            zIndex: 555,
          }}
          onClick={props.onClick}
        >
          Xem chi tiết
        </Box>
      </Permission>
      {/* <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.2,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          zIndex: 88,
          fontSize: '70px',
          padding: 5,
        }}
      >
        {props.icon}
      </div> */}
    </div>
  );
};

ReportBox.propTypes = {
  data: PropTypes.array,
  icon: PropTypes.object,
  text: PropTypes.string,
  number: PropTypes.number,
  blockNumber: PropTypes.number,
  onClick: PropTypes.func,
};

export default memo(ReportBox);
