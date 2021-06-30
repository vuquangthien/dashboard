/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */

import React, { memo, useState, useEffect } from 'react';
import {
  TableCell,
  TableRow
} from '@material-ui/core';
import useStyles from '../../utils/styles';
import { FILTER_OPERATOR, DATE_FIELD_NAMES, GENDER, BLOOD_GROUP, MARRIAGE_STATUS, DATE_FORMAT } from '../../utils/constants';
import { convertBirthDate, renderFieldValue, } from '../../utils/common';
import RenderFieldValue from '../RenderField';




function CustomRow(props) {
  const { data, fieldNames } = props;
  const { groupIndex, filterFields } = data;
  const classes = useStyles();

  const parseFieldName = (code) => {
    const item = fieldNames && fieldNames.find(b => b.code === code);
    return item ? item.displayName : '';
  }
  const parseOperator = (value) => {
    const operator = FILTER_OPERATOR.find(f => f.value === value);
    return operator ? operator.label : '';
  }

  const formatFilterValue = item => {
    // return renderFieldValue(item.filterField, item.filterValue)
    return <RenderFieldValue fieldName={item.filterField} fieldValue={item.filterValue} />
    // (item.filterField, item.filterValue)
  }
  // if (DATE_FIELD_NAMES.indexOf(item.filterField) > -1) {
  //   return convertBirthDate(item.filterValue);
  // };
  // if (item.filterField === 'BLOOD_GROUP') {
  //   const bloodGroup = BLOOD_GROUP.find(b => b.value === item.filterValue);
  //   if (bloodGroup) return bloodGroup.name;
  // };
  // if (item.filterField === 'MARRIAGE_STATUS') {
  //   const marriageStatus = MARRIAGE_STATUS.find(m => m.value === item.filterValue);
  //   if (marriageStatus) return marriageStatus.name;
  // }
  // if (item.filterField === 'GENDER') {
  //   const gender = GENDER.find(g => g.value === item.filterValue);
  //   if (gender) return gender.name;
  // }
  // return item.filterValue;

  return (
    <>
      {filterFields && filterFields.sort((a, b) => a.filterIndex - b.filterIndex).map((item, i) => (
        <TableRow key={`row_${i}`}>
          {i === 0 && (
            <TableCell rowSpan={filterFields.length} align="center">{groupIndex}</TableCell>
          )}
          <TableCell  >{parseFieldName(item.filterField)}</TableCell>
          <TableCell align="center">{parseOperator(item.filterOperator)}</TableCell>
          <TableCell className={classes.customCellBody} align="center">{formatFilterValue(item)}</TableCell>
        </TableRow>
      ))}

    </>

  )
}
export default memo(CustomRow);
