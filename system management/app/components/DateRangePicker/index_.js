/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import omit from 'lodash/omit';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './styles.css';

import {
  DateRangePicker,
  DateRangePickerShape,
  DateRangePickerPhrases,
} from 'react-dates';

export const START_DATE = 'startDate';
export const END_DATE = 'endDate';
export const HORIZONTAL_ORIENTATION = 'horizontal';
export const VERTICAL_ORIENTATION = 'vertical';
export const VERTICAL_SCROLLABLE = 'verticalScrollable';
export const ANCHOR_LEFT = 'left';
export const ANCHOR_RIGHT = 'right';
export const NAV_POSITION_BOTTOM = 'navPositionBottom';
export const NAV_POSITION_TOP = 'navPositionTop';

// import {
//   START_DATE,
//   END_DATE,
//   HORIZONTAL_ORIENTATION,
//   ANCHOR_LEFT,
//   NAV_POSITION_TOP,
// } from '../src/constants';
function isBeforeDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

  const aYear = a.year();
  const aMonth = a.month();

  const bYear = b.year();
  const bMonth = b.month();

  const isSameYear = aYear === bYear;
  const isSameMonth = aMonth === bMonth;

  if (isSameYear && isSameMonth) return a.date() < b.date();
  if (isSameYear) return aMonth < bMonth;
  return aYear < bYear;
}

function isInclusivelyAfterDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return !isBeforeDay(a, b);
}
const propTypes = {
  // example props for the demo
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  stateDateWrapper: PropTypes.func,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,
  handleDatesChange: PropTypes.func,
  ...omit(DateRangePickerShape, [
    'startDate',
    'endDate',
    'onDatesChange',
    'focusedInput',
    'onFocusChange',
  ]),
};

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,
  handleDatesChange: () => {},
  // input related props
  startDateId: START_DATE,
  startDatePlaceholderText: 'Từ ngày',
  endDateId: END_DATE,
  endDatePlaceholderText: 'Đến ngày',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  block: false,
  small: false,
  regular: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,

  // navigation related props
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: () => {},
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: DateRangePickerPhrases,

  stateDateWrapper: date => date,
};

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = START_DATE;
    } else if (props.autoFocusEndDate) {
      focusedInput = END_DATE;
    }

    this.state = {
      focusedInput,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  componentDidUpdate(previousProps) {
    // console.log(previousProps);
  }

  onDatesChange({ startDate, endDate }) {
    const { stateDateWrapper, handleDatesChange } = this.props;
    // console.log(this.props);

    // if (!this.props.startDate && !this.props.endDate) {
    //   console.log(!this.props.startDate);
      
    //   this.setState({
    //     startDate: startDate && stateDateWrapper(startDate),
    //     endDate: endDate && stateDateWrapper(endDate),
    //   });
    // }
    handleDatesChange({ startDate, endDate, stateDateWrapper });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const { handleDatesChange, ...rest } = this.props;

    // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
    // example wrapper but are not props on the SingleDatePicker itself and
    // thus, have to be omitted.
    const props = omit(rest, [
      'autoFocus',
      'autoFocusEndDate',
      'initialStartDate',
      'initialEndDate',
      'stateDateWrapper',
    ]);
    return (
      <div>
        <DateRangePicker
          {...props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
        />
      </div>
    );
  }
}

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

export default DateRangePickerWrapper;
