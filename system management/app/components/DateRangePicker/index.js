/* eslint-disable react/default-props-match-prop-types */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import {
  DateRangeDelimiter,
  DesktopDateRangePicker,
} from '@material-ui/pickers';
import { TextField, Box } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import moment from 'moment';
import { DATE_FORMAT } from '../../utils/constants';
import IconCustomButton from '../CustomButtons/IconButton';
import { validateDate } from '../../utils/validation';

const propTypes = {
  // example props for the demo
  fromDate: PropTypes.object,
  toDate: PropTypes.object,
  fromDateLabel: PropTypes.string,
  toDateLabel: PropTypes.string,
  onDateChange: PropTypes.func,
  showClearDate: PropTypes.bool,
  onValidateDate: PropTypes.func,
};

const defaultProps = {
  // example props for the demo
  fromDateLabel: 'Từ ngày',
  toDateLabel: 'Đến ngày',
  showClearDate: true,
  validationError: false,
  maxDate: moment().endOf('d'),
  minDate: moment().add(-5, 'year'),
  fromDate: moment().startOf('month'),
  toDate: moment(),
};

export function CustomDateRangePicker(props) {
  const {
    fromDateLabel,
    toDateLabel,
    fromDate,
    toDate,
    onDateChange,
    showClearDate,
    onValidateDate,
    ...rest
  } = props;

  // const [open, setOpen] = useState(false);
  const [fromDateError, setFromDateError] = useState(false);
  const [toDateError, setToDateError] = useState(false);

  const handDateChange = dates => {
    const fromDateVal =
      dates[0] && dates[0].isValid() && dates[0].format(DATE_FORMAT.DATE);
    const toDateVal =
      dates[1] && dates[1].isValid() && dates[1].format(DATE_FORMAT.DATE);
    const fromDateErr =
      (dates[0] && !dates[0].isValid()) ||
      (fromDateVal && !validateDate(fromDateVal)) ||
      (dates[0] &&
        dates[0].isValid() &&
        !dates[0].isSameOrBefore(moment().endOf('d')));
    const toDateErr =
      (dates[1] && !dates[1].isValid()) ||
      (toDateVal && !validateDate(toDateVal)) ||
      (fromDateVal &&
        toDateVal &&
        !fromDateErr &&
        dates[1].isBefore(dates[0].startOf('d'))) ||
      (dates[1] &&
        dates[1].isValid() &&
        !dates[1].isSameOrBefore(moment().endOf('d')));

    setFromDateError(fromDateErr);
    setToDateError(toDateErr);

    onDateChange([dates[0], dates[1] && dates[1].endOf('d')]);
    if (typeof onValidateDate === 'function') {
      onValidateDate({ fromDateError: fromDateErr, toDateError: toDateErr });
    }
    // if (dates[1]) {
    //   setOpen(false);
    // }
  };

  function handleClearDate() {
    onDateChange([null, null]);
    setFromDateError(false);
    setToDateError(false);
    if (typeof onValidateDate === 'function') {
      onValidateDate({ fromDateError: false, toDateError: false });
    }
  }

  return (
    // TT - sửa lỗi: position fix - của option panel - khi cuộn chuột : "DATE PICKER":
    <div style={{ position: 'relative' }}>
      <DesktopDateRangePicker
        // TUANTRAN - FIXBUG : date select + search
        disableAutoMonthSwitching
        // TT - sửa lỗi: position fix - của option panel - khi cuộn chuột : "DATE PICKER":
        PopperProps={{ disablePortal: true }}
        // open={open}
        // ignoreInvalidInputs
        startText={fromDateLabel}
        inputFormat={DATE_FORMAT.DATE}
        endText={toDateLabel}
        value={[fromDate, toDate]}
        onChange={handDateChange}
        renderInput={(startProps, endProps) => (
          // TT
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            style={{
              width: '100%',
            }}
          >
            <TextField
              {...startProps}
              fullWidth
              size="small"
              margin="dense"
              // onClick={() => setOpen(true)}
              error={fromDateError}
              helperText={null}
            />
            {/* <DateRangeDelimiter>-</DateRangeDelimiter> */}
            {/* TT */}
            <span style={{ padding: '4px' }}>-</span>
            <TextField
              {...endProps}
              fullWidth
              size="small"
              margin="dense"
              error={toDateError}
              helperText={null}
              InputProps={{
                endAdornment:
                  showClearDate && fromDate && toDate ? (
                    <IconCustomButton
                      tooltip="Xóa"
                      size="small"
                      onClick={handleClearDate}
                    >
                      <Close fontSize="small" />
                    </IconCustomButton>
                  ) : null,
              }}
            />
          </Box>
        )}
        {...rest}
      />
    </div>
  );
}

CustomDateRangePicker.propTypes = propTypes;
CustomDateRangePicker.defaultProps = defaultProps;

CustomDateRangePicker.propTypes = {
  fromDateLabel: PropTypes.string,
  toDateLabel: PropTypes.string,
  fromDate: PropTypes.number,
  toDate: PropTypes.number,
  onDateChange: PropTypes.func,
};

export default memo(CustomDateRangePicker);
