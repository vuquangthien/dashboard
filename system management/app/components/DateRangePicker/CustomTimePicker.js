/* eslint-disable react/default-props-match-prop-types */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { TimePicker } from '@material-ui/pickers';
import { TextField, makeStyles } from '@material-ui/core';
import { Timer } from '@material-ui/icons';
import moment from 'moment';

const propTypes = {
  // example props for the demo
  label: PropTypes.string,
  value: PropTypes.object,
  onDateChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  minTime: PropTypes.object,
};
const defaultProps = {
  label: 'Chọn thời gian',
  value: null,
  disabled: false,
  required: false,
};

export function CustomTimePicker(props) {
  const {
    label,
    value,
    onDateChange,
    disabled,
    required,
    error,
    minTime,
  } = props;
  return (
    <TimePicker
      renderInput={textProps => (
        <TextField
          {...textProps}
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          helperText={null}
          required={required}
          error={error || (minTime && moment(value).isBefore(minTime))}
        />
      )}
      disabled={disabled}
      // minTime={minTime && minTime}
      clearable
      openPickerIcon={<Timer fontSize="small" />}
      ampm={false}
      label={label}
      value={value}
      onChange={onDateChange}
    />
  );
}

CustomTimePicker.propTypes = propTypes;
CustomTimePicker.defaultProps = defaultProps;

export default memo(CustomTimePicker);