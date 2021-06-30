/* eslint-disable react/prop-types */
/**
 *
 * Asynchronously loads the component for Chart
 *
 */
import React, { memo, useState, useEffect, Fragment } from 'react';
import { Box, Grid } from '@material-ui/core';
import moment from 'moment';
import { CustomDateRangePicker } from '../DateRangePicker';
import { LIST_MONTH, QUARTER } from '../../utils/constants';
import CustomAutocomplete from '../CustomAutocomplete';

const SelectDate = memo(props => {
  const {
    list,
    onChange,
    dateValue,
    currentType,
    handleChangeDay,
    flex,
    year,
  } = props;

  const [listYear, setListYear] = useState([]);
  useEffect(() => {
    const newListYear = getListYear();
    setListYear(newListYear);
  }, []);

  const getListYear = () => {
    const newArray = [];
    const newYear = new Date().getFullYear();
    for (let i = 0; newArray.length < 5; i += 1) {
      newArray.push({
        label: `${newYear - i}`,
        value: newYear - i,
      });
    }
    return newArray;
  };
  const getListWeek = years => {
    const newArray = [];
    const weekNow = moment().week();
    if (weekNow === 1) {
      if (moment().dayOfYear() < 367) {
        for (let i = 0; i < 53; i += 1) {
          newArray.push({
            label: `${i + 1} - ${moment(getFirstDayInWeek(i + 1, years)).format(
              'DD/MM',
            )} `,
            value: i + 1,
          });
        }
        return newArray;
      }
    }
    for (let i = 0; i < weekNow; i += 1) {
      newArray.push({
        label: `${i + 1} - ${moment(getFirstDayInWeek(i + 1, years)).format(
          'DD/MM',
        )} `,
        value: i + 1,
      });
    }
    const lastDayOfYear = moment(
      new Date(new Date(`${years}`).getFullYear(), 11, 31),
    ).format('DD');
    const firstDayOfWeek = moment(
      getFirstDayOfWeek(new Date(`${years + 1}/01/01`)),
    ).format('DD');
    if (
      Number(lastDayOfYear) >= Number(firstDayOfWeek) &&
      newArray.length >= 52
    ) {
      newArray.push({
        label: `${newArray.length + 1} - ${moment(
          getFirstDayOfWeek(new Date(`${years + 1}/01/01`)),
        ).format('DD/MM')}`,
        value: newArray.length + 1,
      });
    }
    return newArray;
  };
  const getFirstDayInWeek = (week, years) => {
    if (week === 1) {
      const date = moment([years, 0, 1]);
      return date;
    }
    const weekDay = moment([years, 0, 1]).isoWeekday(); // lấy index của ngày đầu tiên trong tuần đầu tiên
    const totalDay = week * 7 - 6 - weekDay + 1; // trừ 6 ngày + 1 ngày hao của weekday
    return moment([years])
      .dayOfYear(totalDay)
      .startOf('day');
  };
  const getListMonths = years => {
    const newArray = [];
    // const totalWeekInYear = moment().weeksInYear(year);
    const monthNow = moment().months();
    for (let i = 0; i < monthNow + 1; i += 1) {
      newArray.push({
        label: `${i + 1}`,
        value: i + 1,
      });
    }
    return newArray;
  };
  const getListQuater = years => {
    const newArray = [];
    const quarterNow = moment().quarter();
    for (let i = 0; i < quarterNow; i += 1) {
      newArray.push({
        label: `${i + 1}`,
        value: i + 1,
      });
    }
    return newArray;
  };
  const getListWeek2 = () => {
    const newArray = [];
    const yearNow = dateValue.year && dateValue.year.value;
    const lastDayOfYear = moment(
      new Date(new Date(`${yearNow}`).getFullYear(), 11, 31),
    ).format('DD');
    const firstDayOfWeek = moment(
      getFirstDayOfWeek(new Date(`${yearNow + 1}/01/01`)),
    ).format('DD');
    const totalWeekInYear = moment().weeksInYear(); // 52
    for (let i = 0; i < totalWeekInYear; i += 1) {
      newArray.push({
        label: `${i + 1}`,
        value: i + 1,
      });
    }
    if (Number(lastDayOfYear) >= Number(firstDayOfWeek)) {
      newArray.push({
        label: `${newArray.length + 1}`,
        value: newArray.length + 1,
      });
    }
    return newArray;
  };

  const getFirstDayOfWeek = date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const parseOptions = (type, field) => {
    if (type === 'year') {
      return listYear;
    }
    if (year === moment().year()) {
      if (type === 'quarter') {
        const listQuater = getListQuater();
        return listQuater;
      }
      if (type === 'month') {
        const listMonth = getListMonths();
        return listMonth;
      }
      if (type === 'week') {
        const listWeeks = getListWeek(year);
        return listWeeks;
      }
    } else {
      if (type === 'month') {
        return LIST_MONTH;
      }
      if (type === 'week') {
        const listWeeks = getListWeek2();
        return listWeeks;
      }
      if (type === 'quarter') {
        return QUARTER;
      }
    }
    return [];
  };
  const handleDateChange = dates => {
    const [fromDate, toDate] = dates;
    handleChangeDay(fromDate, toDate);
  };
  return (
    <>
      <Grid container justify={flex} spacing={2} alignItems="center">
        {currentType === 'day' && (
          <Grid item xs>
            <CustomDateRangePicker
              // TT - sửa lỗi: position fix - của option panel - khi cuộn chuột : "CHƯA SỬA ĐC - DATE PICKER": // disablePortal={true}
              fromDate={dateValue.fromDay && moment(dateValue.fromDay)}
              toDate={dateValue.toDay && moment(dateValue.toDay)}
              onDateChange={handleDateChange}
            />
          </Grid>
        )}
        {currentType !== 'day' &&
          list &&
          list.map(item => (
            <Fragment key={item.field}>
              <Grid item xs>
                <CustomAutocomplete
                  // TT - sửa lỗi: position fix - của option panel - khi cuộn chuột : "OK - XONG RỒI"
                  disablePortal
                  optionLabel="label"
                  textLabel={item.textLabel}
                  // textLabel="Đến Tháng"
                  style={{ width: 'auto' }}
                  value={dateValue[item.field]}
                  // disableClearable
                  onChange={value => {
                    onChange(item.field, value);
                  }}
                  options={parseOptions(item.type, item.field)}
                  // isItemDisabled={u => {
                  //   if (
                  //     item.field === 'toWeek' &&
                  //     dateValue.fromWeek &&
                  //     u.value < dateValue.fromWeek.value
                  //   ) {
                  //     return true;
                  //   }
                  //   if (
                  //     item.field === 'toMonth' &&
                  //     dateValue.fromMonth &&
                  //     u.value < dateValue.fromMonth.value
                  //   ) {
                  //     return true;
                  //   }
                  //   return false;
                  // }}
                />
              </Grid>

              {list.indexOf(item) === list.length / 2 - 1 && (
                <Grid>
                  <Box
                    style={{ marginLeft: 5, marginRight: 5 }}
                    display="flex"
                    alignItems="center"
                  >
                    -
                  </Box>
                </Grid>
              )}
            </Fragment>
          ))}
      </Grid>
    </>
  );
});

export default SelectDate;
