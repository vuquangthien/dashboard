/* eslint-disable react/prop-types */
/**
 *
 * Asynchronously loads the component for Chart
 *
 */
import React, { memo, useState, useCallback } from 'react';
import { Search, CropFree } from '@material-ui/icons';
import {
  Button,
  Tooltip,
  Grid,
  CardContent,
  Card,
  Box,
} from '@material-ui/core';

import moment from 'moment';
import {
  AGGTYPES_LABEL,
  FUNCTION_PERMISSIONS_MAPPING,
} from '../../utils/constants';
import CustomAutocomplete from '../CustomAutocomplete';
import SelectDate from './SelectDate';
import {
  FilterYearDashBoard,
  FilterQuarter,
  FilterHalfYear,
  FilterMonth,
  FilterWeek,
  FilterDay,
  DefaultDataDate,
  DefaultDataYear,
  DefaultDataHalfYear,
  DefaultDataQuarter,
  DefaultDataMonth,
  DefaultDataWeek,
} from './Constants';
import Permission from '../Permission';
const SearchBox = memo(props => {
  const { classes, onOpenFullChart } = props;
  const initialFromDateAggDay = moment().startOf('month');
  const initialToDateAggDay = moment();
  const [query, setQuery] = useState({
    aggType: AGGTYPES_LABEL.find(obj => obj.value === 'day'),
    fromDate: initialFromDateAggDay,
    toDate: initialToDateAggDay,
  });

  const [data, setData] = useState(DefaultDataDate);
  const [criteriaSearch, setCriteriaSearch] = useState(FilterDay);
  const [canSearch, setCanSearch] = useState(true);
  // TT
  const yearNow = new Date().getFullYear();
  const monthNow = new Date().getMonth() + 1;
  const quarterNow = Math.floor((monthNow-1)/3) + 1;
  const halfYearNow = Math.floor((monthNow-1)/6) + 1;
  const weekNow = moment().weeks();

  const resetDataDate = type => {
    if (type) {
      switch (type) {
        case 'year':
          setData(DefaultDataYear);
          break;
        case 'halfYear':
          setData(DefaultDataHalfYear);
          break;
        case 'quarter':
          setData(DefaultDataQuarter);
          break;
        case 'month':
          setData(DefaultDataMonth);
          break;
        case 'week':
          setData(DefaultDataWeek);
          break;
        case 'day':
          setData(DefaultDataDate);
          break;
        default:
          break;
      }
    }
    setCanSearch(true);
  };

  const handleCheckCanSearch = data => {
    const {
      fromYear,
      toYear,
      year,
      fromQuarter,
      toQuarter,
      fromMonth,
      toMonth,
      fromWeek,
      toWeek,
      fromDay,
      toDay,
    } = data;
    switch (query.aggType.value) {
      case 'year':
        if (fromYear === null) {
          return setCanSearch(false);
        }
        // TT - NẾU TRƯỜNG "ĐẾN NĂM" - "KHÔNG CHỌN" : thì lấy "NĂM HIỆN TẠI CỦA NĂM" để gán cho "ĐẾN NĂM"
        if (fromYear && toYear === null && yearNow >= fromYear.value) {
          return setCanSearch(true);
        }
        if (fromYear.value && toYear.value && toYear.value >= fromYear.value) {
          return setCanSearch(true);
        }
        return setCanSearch(false);
      case 'halfYear':
        // ??? HỎI LẠI BA - XEM CÓ SỬ DỤNG KO ???
        if (year && year.value) {
          return setCanSearch(true);
        }
        setCanSearch(false);
        break;
      case 'quarter':
        // TT - NẾU TRƯỜNG "ĐẾN QUÝ" - "KHÔNG CHỌN" && "NĂM" bằng "NĂM HIỆN TẠI" : thì lấy "QUÝ HIỆN TẠI CỦA NĂM" để gán cho "ĐẾN QUÝ"
        if (fromQuarter && year && year.value === yearNow && toQuarter === null && fromQuarter.value <= quarterNow) {
          return setCanSearch(true);
        }
        if (
          year &&
          year.value &&
          fromQuarter &&
          toQuarter &&
          fromQuarter.value <= toQuarter.value
        ) {
          return setCanSearch(true);
        }
        return setCanSearch(false);
      case 'month':
        // TT - NẾU TRƯỜNG "ĐẾN THÁNG" - "KHÔNG CHỌN" && "NĂM" bằng "NĂM HIỆN TẠI" : thì lấy "THÁNG HIỆN TẠI CỦA NĂM" để gán cho "ĐẾN THÁNG"
        if (fromMonth && year && year.value === yearNow && toMonth === null && fromMonth.value <= monthNow) {
          return setCanSearch(true);
        }
        if (
          year &&
          year.value &&
          fromMonth &&
          toMonth &&
          fromMonth.value <= toMonth.value
        ) {
          return setCanSearch(true);
        }
        return setCanSearch(false);
      case 'week':
        // TT - NẾU TRƯỜNG "ĐẾN TUẦN" - "KHÔNG CHỌN" && "NĂM" bằng "NĂM HIỆN TẠI" : thì lấy "TUẦN HIỆN TẠI CỦA NĂM" để gán cho "ĐẾN TUẦN"
        if (fromWeek && year && year.value === yearNow && toWeek === null && fromWeek.value <= weekNow) {
          return setCanSearch(true);
        }
        if (
          year &&
          year.value &&
          fromWeek &&
          toWeek &&
          fromWeek.value <= toWeek.value
        ) {
          return setCanSearch(true);
        }
        return setCanSearch(false);
      // TT - NẾU TRƯỜNG "ĐẾN NGÀY" - "KHÔNG CHỌN" : thì lấy "NGÀY HIỆN TẠI CỦA NĂM" để gán cho "ĐẾN NGÀY"
      case 'day':
        if (toDay === null) {
          if (fromDay && toDay <= moment().add(1, 'days')) {
            return setCanSearch(true);
          }
          return setCanSearch(false);
        }
        if (
          fromDay &&
          fromDay < toDay &&
          toDay &&
          toDay <= moment().add(1, 'days')
        ) {
          return setCanSearch(true);
        }
        return setCanSearch(false);

      default:
        break;
    }
  };
  const handleChangeValue = useCallback(
    (type, newValue) => {
      const newData = { ...data };
      newData[type] = newValue;
      setData(newData);
      handleCheckCanSearch(newData);
    },
    [data, query],
  );
  const handleChangeTypeDay = useCallback(
    (newFromDay, newToday) => {
      const newData = {
        ...data,
        fromDay: newFromDay * 1 !== 0 ? newFromDay * 1 : null,
        toDay: newToday * 1 !== 0 ? newToday * 1 : null,
      };
      setData(newData);
      setQuery({
        aggType: { label: 'Ngày', value: 'day' },
        fromDate: newFromDay * 1 !== 0 ? newFromDay * 1 : null,
        toDate: newToday * 1 !== 0 ? newToday * 1 : null,
      });
      handleCheckCanSearch(newData);
    },
    [data, query],
  );

  const handleChangeType = obj => {
    if (obj) {
      resetDataDate(obj.value);
      const { value } = obj;
      switch (value) {
        case 'year':
          setCriteriaSearch(FilterYearDashBoard);
          break;
        case 'halfYear':
          setCriteriaSearch(FilterHalfYear);
          break;
        case 'quarter':
          setCriteriaSearch(FilterQuarter);
          break;
        case 'month':
          setCriteriaSearch(FilterMonth);
          break;
        case 'week':
          setCriteriaSearch(FilterWeek);
          break;
        case 'day':
          setCriteriaSearch(FilterDay);
          return setQuery({
            ...query,
            aggType: obj,
            fromDate: initialFromDateAggDay,
            toDate: initialToDateAggDay,
          });
        default:
          break;
      }
    } else {
      setCriteriaSearch([]);
      setCanSearch(false);
    }
    setQuery({
      ...query,
      aggType: obj,
    });
  };

  const getFirstDayInMonth = (month, year) =>
    moment([year])
      .month(month - 1)
      .startOf('day') * 1;

  const getLastDayInMonth = (month, year) =>
    moment([year])
      .month(month)
      .startOf('day') * 1;

  const getFirstDayInWeek = (week, year) => {
    if (week < 53) {
      if (week === 1) {
        const date = moment([year, 0, 1]);
        return date;
      }
      const weekDay = moment([year, 0, 1]).isoWeekday(); // lấy index của ngày đầu tiên trong tuần đầu tiên
      const totalDay = week * 7 - 6 - weekDay + 1; // trừ 6 ngày + 1 ngày hao của weekday
      return moment([year])
        .dayOfYear(totalDay)
        .startOf('day');
    }
    return moment(
      new Date(getFirstDayOfWeek(new Date(`${year + 1}/01/01`))),
    ).format('x');
  };
  const getFirstDayOfWeek = date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };
  const getLastDayInWeek = (week, year) => {
    // debugger;
    const weekDay = moment([year, 0, 1]).isoWeekday();
    if (week < 53) {
      if (week === 1) {
        const date = moment([year, 0, 9 - weekDay]);
        return date;
      }
      const totalDay = week * 7 - weekDay + 2;
      return moment([year])
        .dayOfYear(totalDay)
        .startOf('day');
    }
    const lastDayOfYear = `${moment(
      new Date(new Date(`${year}`).getFullYear(), 11, 31),
    ).format('YYYY/MM/DD')} 23:59:59`;
    return moment(lastDayOfYear).format('x');
  };

  const handleSearch = () => {
    const type = query.aggType.value;
    if (type === 'year') {
      const { fromYear, toYear } = data;
      if (fromYear && toYear === null) {
        const newFromDate = getFirstDayInMonth(1, fromYear.value);
        const newToDate = getLastDayInMonth(12, moment().years());
        getData(newFromDate, newToDate);
      }
      if (fromYear && toYear && toYear.value >= fromYear.value) {
        const newFromDate = getFirstDayInMonth(1, fromYear.value);
        const newToDate = getLastDayInMonth(12, toYear.value);
        getData(newFromDate, newToDate);
      }
    }
    if (type === 'halfYear') {
      const { year } = data;
      if (year) {
        const newFromDate = getFirstDayInMonth(1, year.value);
        const newToDate = getLastDayInMonth(6, year.value);
        getData(newFromDate, newToDate);
      }
    }
    if (type === 'quarter') {
      const { fromQuarter, toQuarter, year } = data;
      if (fromQuarter && year && toQuarter === null) {
        const newFromDate = getFirstDayInMonth(
          fromQuarter.value * 3 - 2,
          year.value,
        );
        const newToDate = getLastDayInMonth(
          moment().quarters() * 3,
          year.value,
        );
        getData(newFromDate, newToDate);
      }
      if (
        fromQuarter &&
        toQuarter &&
        year &&
        toQuarter.value >= fromQuarter.value
      ) {
        const newFromDate = getFirstDayInMonth(
          fromQuarter.value * 3 - 2,
          year.value,
        );
        const newToDate = getLastDayInMonth(toQuarter.value * 3, year.value);
        getData(newFromDate, newToDate);
      }
    }
    if (type === 'month') {
      const { fromMonth, toMonth, year } = data;
      if (toMonth === null && year && fromMonth) {
        const newFromDate = getFirstDayInMonth(fromMonth.value, year.value);
        const newToDate = getLastDayInMonth(moment().months() + 1, year.value);
        getData(newFromDate, newToDate);
      }
      if (fromMonth && toMonth && year && toMonth.value >= fromMonth.value) {
        const newFromDate = getFirstDayInMonth(fromMonth.value, year.value);
        const newToDate = getLastDayInMonth(toMonth.value, year.value);
        getData(newFromDate, newToDate);
      }
    }
    if (type === 'week') {
      const { fromWeek, toWeek, year } = data;
      if (toWeek === null && fromWeek && year) {
        const newFromDate = getFirstDayInWeek(fromWeek.value, year.value) * 1;
        const newToDate =
          getLastDayInWeek(moment(year).weeks(), year.value) * 1;
        getData(newFromDate, newToDate);
      }
      if (fromWeek && toWeek && year && toWeek.value >= fromWeek.value) {
        const newFromDate = getFirstDayInWeek(fromWeek.value, year.value) * 1;
        const newToDate = getLastDayInWeek(toWeek.value, year.value) * 1;
        getData(newFromDate, newToDate);
      }
    }
    if (type === 'day') {
      if (query.toDate === null) {
        const newData = {
          aggType: 'day',
          fromDate: query.fromDate * 1,
          toDate: moment().endOf('d') * 1,
        };
        props.onSearch(newData);
      } else {
        const newData = {
          aggType: 'day',
          fromDate: query.fromDate * 1,
          toDate: moment(query.toDate).endOf('d') * 1,
        };
        props.onSearch(newData);
      }
    }
  };

  const getData = (newFromDate, newToDate) => {
    const newQueryGetData = { ...query };
    newQueryGetData.aggType =
      query.aggType.value === 'halfYear' ? 'month' : query.aggType.value;
    newQueryGetData.fromDate = newFromDate;
    newQueryGetData.toDate = newToDate;
    setQuery({
      ...query,
      fromDate: newFromDate,
      toDate: newToDate,
    });
    props.onSearch(newQueryGetData);
  };

  const handleOpenFullChart = () => {
    onOpenFullChart(query);
  };

  return (
    // TT - sửa lỗi: position fix - của option panel - khi cuộn chuột : "DATE PICKER":
    <Card variant="outlined" style={{overflow:'unset'}}>
      <CardContent>
        <Grid
          className={classes.root}
          container
          spacing={2}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} lg={2}>
            <CustomAutocomplete
              // TT - sửa lỗi: position fix - của option panel - khi cuộn chuột : "OK - XONG RỒI"
              disablePortal
              optionLabel="label"
              value={query.aggType}
              textLabel="Theo"
              onChange={handleChangeType}
              options={AGGTYPES_LABEL}
              disableClearable
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            {/* {renderDatePicker} */}
            {/* <h1>abc</h1> */}
            <SelectDate
              // TT - sửa lỗi: position fix - của option panel - khi cuộn chuột : "CHƯA SỬA ĐC - DATE PICKER": // disablePortal={true}
              list={criteriaSearch}
              onChange={handleChangeValue}
              dateValue={data}
              currentType={query.aggType && query.aggType.value}
              handleChangeDay={handleChangeTypeDay}
              flex="flex-end"
              year={data.year && data.year.value}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box
              // display="flex"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <Permission
                    permission={
                      FUNCTION_PERMISSIONS_MAPPING.DASHBOARD_PAGE.SEARCH
                    }
                  >
                    <Tooltip title="Tìm kiếm">
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        disabled={!canSearch}
                        // style={{ height: 38.09, marginTop: 1, width: '48%' }}
                      >
                        <Search />
                      </Button>
                    </Tooltip>
                  </Permission>
                </Grid>
                <Grid item>
                  <Permission
                    permission={
                      FUNCTION_PERMISSIONS_MAPPING.DASHBOARD_PAGE.ZOOM
                    }
                  >
                    <Tooltip title="Phóng to">
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenFullChart}
                        disabled={!canSearch}
                        // style={{ height: 38.09, marginTop: 1, width: '48%' }}
                      >
                        <CropFree />
                      </Button>
                    </Tooltip>
                  </Permission>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});

export default SearchBox;
