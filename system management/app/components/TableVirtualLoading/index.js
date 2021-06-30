/**
 *
 * Loading
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../../utils/styles';

// HÀM PHỤ :
function HeadTableVitual() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '12.4%',
        height: '38.3px',
        borderRight: '1px solid #d9d9d9',
        textAlign: 'center',
        paddingTop: '10px',
      }}
    >
      ......
    </span>
  );
}

// COMPONENT :
function TableVirtualLoading(props) {
  const classes = useStyles();
  const { zIndexNumber } = props;
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: zIndexNumber,
        width: '100%',
      }}
    >
      <div
        className={classes.primaryBgColorHeaderTableRow}
        style={{
          width: '100%',
          height: '38.3px',
          border: '1px solid #d9d9d9',
          borderRadius: '0px',
          display: 'flex',
          justifyContent: 'center',
          color: 'black',
        }}
      >
        <HeadTableVitual />
        <HeadTableVitual />
        <HeadTableVitual />
        <HeadTableVitual />
        <HeadTableVitual />
        <HeadTableVitual />
        <HeadTableVitual />
        <HeadTableVitual />
        <HeadTableVitual />
      </div>
      <div
        style={{
          width: '100%',
          height: '80px',
          border: '1px solid #d9d9d9',
          borderRadius: '0px',
        }}
      >
        <h4
          style={{
            marginTop: '40px',
            textAlign: 'center',
            color: 'black',
          }}
        >
          Đang tải dữ liệu ...
        </h4>
      </div>
    </div>
  );
}

TableVirtualLoading.propTypes = {
  zIndexNumber: PropTypes.number,
};

export default memo(TableVirtualLoading);