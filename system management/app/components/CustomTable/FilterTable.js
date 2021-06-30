/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/**
 *
 * AsyncAutocomplete
 *
 */

import React, { memo, Fragment } from 'react';
import { TableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomTable from './index';
import CustomRow from './CustomRow';

function FilterTable({ ...props }) {
  const { fieldNames, filterGroups, classes } = props;

  const Header = (
    <Fragment>
      <TableCell className={classes.customCellHeader} align="center">
        STT
      </TableCell>
      <TableCell className={classes.customCellHeader} align="center">
        Thông tin tích hợp
      </TableCell>
      <TableCell className={classes.customCellHeader} align="center">
        Điều kiện
      </TableCell>
      <TableCell className={classes.customCellHeaderLast} align="center">
        Giá trị lọc
      </TableCell>
    </Fragment>
  );

  const rowComponent = () =>
    filterGroups &&
    filterGroups.map((group, i) => {
      // TT : hiển thị TÌNH TRẠNG CÔNG DÂN : (1: Còn sống; 2: Đã chết; 3: Mất tích)
      if (group.filterFields[0].filterField === "CITIZEN_STATUS") {
        switch (group.filterFields[0].filterValue) {
          case '1': group.filterFields[0].filterValue = 'Còn sống' ; break;
          case '2': group.filterFields[0].filterValue = 'Đã chết' ; break;
          case '3': group.filterFields[0].filterValue = 'Mất tích' ; break;        
          default: 
            break;
        }
      }
      
      return (
        <CustomRow fieldNames={fieldNames} data={group} key={`group_${i + 1}`} />
      )
    });

  // ĐÂY LÀ BẢNG THƯỜNG - KHÔNG PHẢI GRID CỦA DEVEXPRESS :
  // CUSTOMTABLE = HEADER + ROW
  return <CustomTable header={Header} row={rowComponent()} />;
}
FilterTable.defaultProps = {
  fieldNames: [],
  filterGroups: [],
};

FilterTable.propTypes = {
  fieldNames: PropTypes.array,
  filterGroups: PropTypes.array,
};

export default memo(FilterTable);
