/* eslint-disable react/prop-types */
/* eslint-disable react/default-props-match-prop-types */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from '@material-ui/pickers';
import { TextField } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import moment from 'moment';

const propTypes = {
  // example props for the demo
  label: PropTypes.string,
  value: PropTypes.object,
  onDateChange: PropTypes.func,
  minDate: PropTypes.object,
  canEqualCurrentDate: PropTypes.bool,
  setDateError: PropTypes.func,
};

const defaultProps = {
  label: 'Chọn thời gian',
  value: null,
  minDate: null,
  canEqualCurrentDate: false,
};

export function CustomDatePicker(props) {
  const {
    label,
    value,
    onDateChange,
    minDate,
    maxDate,
    required = false,
    setDateError,
    error,
    ...rest
  } = props;
  const handleDateChange = newDate => {
    const date = moment(new Date(newDate));
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <DatePicker
      renderInput={textProps => (
        <TextField
          {...textProps}
          variant="outlined"
          size="small"
          fullWidth
          required={required}
          margin="dense"
          // error={error}
          helperText={null}
        />
      )}
      clearable
      minDate={minDate}
      maxDate={maxDate}
      openPickerIcon={<CalendarToday fontSize="small" />}
      label={label}
      value={value}
      onChange={handleDateChange}
      // error={error}
      {...rest}
    />
  );
}

CustomDatePicker.propTypes = propTypes;
CustomDatePicker.defaultProps = defaultProps;

export default memo(CustomDatePicker);
