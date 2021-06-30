/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/**
 *
 * AsyncAutocomplete
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  Table,
  TableBody,
  TableHead,
  TableContainer,
} from '@material-ui/core';

function CustomTable({ ...props }) {
  const { header, rows, row, ...rest } = props;

  // TT - ĐÂY LÀ BẢNG THƯỜNG - KHÔNG PHẢI GRID CỦA DEVEXPRESS :
  return (
    <TableContainer
      style={{
        maxHeight: 'calc(100vh - 280px)',
        height: 'calc(100% - 24px)',
        borderTop: '1px solid rgba(224, 224, 224, 1)',
      }}
    >
      {/* TT - CUSTOMTABLE = HEADER + ROW */}
      <Table stickyHeader {...rest} size="small">
        <TableHead>
          <TableRow>{header}</TableRow>
        </TableHead>
        <TableBody>{row}</TableBody>
      </Table>
    </TableContainer>
  );
}
CustomTable.defaultProps = {
  rows: [],
  header: {},
};

CustomTable.propTypes = {
  header: PropTypes.object,
  rows: PropTypes.array,
  row: PropTypes.func,
};

export default memo(CustomTable);
