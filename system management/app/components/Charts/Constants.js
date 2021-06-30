import moment from 'moment';
import { getWeekInYear } from '../../utils/common';

export const FilterYear = [
  {
    type: 'year',
    field: 'year',
    textLabel: 'Năm',
  },
];
export const FilterYearDashBoard = [
  {
    type: 'year',
    field: 'fromYear',
    textLabel: 'Từ năm',
  },
  {
    type: 'year',
    field: 'toYear',
    textLabel: 'Đến năm',
  },
];

export const FilterThreeYear = [
  {
    type: 'year',
    field: 'fromYear',
    textLabel: 'Từ năm',
  },
  {
    type: 'year',
    field: 'toYear',
    textLabel: 'Đến năm',
  },
];

export const FilterFiveYear = [
  {
    type: 'year',
    field: 'fromYear',
    textLabel: 'Từ năm',
  },
  {
    type: 'year',
    field: 'toYear',
    textLabel: 'Đến năm',
  },
];

export const FilterHalfYear = [
  {
    type: 'year',
    field: 'year',
    textLabel: 'Năm',
  },
];
export const FilterQuarter = [
  {
    type: 'year',
    field: 'year',
    textLabel: 'Năm',
  },
  {
    type: 'quarter',
    field: 'fromQuarter',
    textLabel: 'Từ quý',
  },
  {
    type: 'quarter',
    field: 'toQuarter',
    textLabel: 'Đến quý',
  },
];
export const FilterMonth = [
  {
    type: 'year',
    field: 'year',
    textLabel: 'Năm',
  },
  {
    type: 'month',
    field: 'fromMonth',
    textLabel: 'Từ tháng',
  },
  {
    type: 'month',
    field: 'toMonth',
    textLabel: 'Đến tháng',
  },
];
export const FilterWeek = [
  {
    type: 'year',
    field: 'year',
    textLabel: 'Năm',
  },
  {
    type: 'week',
    field: 'fromWeek',
    textLabel: 'Từ tuần',
  },
  {
    type: 'week',
    field: 'toWeek',
    textLabel: 'Đến tuần',
  },
];
export const FilterDay = [
  {
    type: 'day',
    field: 'fromDay',
    textLabel: 'Từ ngày',
  },
  {
    type: 'day',
    field: 'toDay',
    textLabel: 'Đến ngày',
  },
];

export const parseLabel = value => ({
  label: `${value}`,
  value,
});
export const DefaultDataFiveYear = {
  fromYear: parseLabel(new Date().getFullYear() - 4),
  toYear: parseLabel(new Date().getFullYear()),
  fromQuarter: null,
  toQuarter: null,
  fromMonth: null,
  toMonth: null,
  fromWeek: null,
  toWeek: null,
  fromDay: null,
  toDay: null,
};
export const DefaultDataThreeYear = {
  fromYear: parseLabel(new Date().getFullYear() - 2),
  toYear: parseLabel(new Date().getFullYear()),
  fromQuarter: null,
  toQuarter: null,
  fromMonth: null,
  toMonth: null,
  fromWeek: null,
  toWeek: null,
  fromDay: null,
  toDay: null,
};

export const DefaultDataYear = {
  fromYear: parseLabel(new Date().getFullYear() - 1),
  toYear: parseLabel(new Date().getFullYear()),
  fromQuarter: null,
  toQuarter: null,
  fromMonth: null,
  toMonth: null,
  fromWeek: null,
  toWeek: null,
  fromDay: null,
  toDay: null,
};

export const DefaultDataYearReport = {
  year: parseLabel(new Date().getFullYear()),
  fromQuarter: null,
  toQuarter: null,
  fromMonth: null,
  toMonth: null,
  fromWeek: null,
  toWeek: null,
  fromDay: null,
  toDay: null,
};

export const DefaultDataHalfYear = {
  year: parseLabel(new Date().getFullYear()),
  fromQuarter: null,
  toQuarter: null,
  fromMonth: null,
  toMonth: null,
  fromWeek: null,
  toWeek: null,
  fromDay: null,
  toDay: null,
};

export const DefaultDataQuarter = {
  year: parseLabel(new Date().getFullYear()),
  fromQuarter: parseLabel(
    Math.ceil((new Date().getMonth() + 1) / 3) - 1 === 0
      ? Math.ceil((new Date().getMonth() + 1) / 3)
      : Math.ceil((new Date().getMonth() + 1) / 3) - 1,
  ),
  toQuarter: parseLabel(Math.ceil((new Date().getMonth() + 1) / 3)),
  fromMonth: null,
  toMonth: null,
  fromWeek: null,
  toWeek: null,
  fromDay: null,
  toDay: null,
};

export const DefaultDataMonth = {
  year: parseLabel(new Date().getFullYear()),
  fromQuarter: null,
  toQuarter: null,
  fromMonth: parseLabel(new Date().getMonth() === 0 ? new Date().getMonth() + 1 : new Date().getMonth()),
  toMonth: parseLabel(new Date().getMonth() + 1),
  fromWeek: null,
  toWeek: null,
  fromDay: null,
  toDay: null,
};

export const DefaultDataWeek = {
  year: parseLabel(new Date().getFullYear()),
  fromQuarter: null,
  toQuarter: null,
  fromMonth: null,
  toMonth: null,
  fromWeek: parseLabel(moment().weeks() === 1 ? moment().weeks() : moment().weeks()-1),
  toWeek: parseLabel(moment().weeks()),
  // fromWeek: parseLabel(getWeekInYear() === 1 ? getWeekInYear() : getWeekInYear()-1),
  // toWeek: parseLabel(getWeekInYear()),
  fromDay: null,
  toDay: null,
};
export const DefaultDataDate = {
  fromYear: null,
  toYear: null,
  year: null,
  fromQuarter: null,
  toQuarter: null,
  fromMonth: null,
  toMonth: null,
  fromWeek: null,
  toWeek: null,
  fromDay: new Date(new Date().getFullYear(), new Date().getMonth(), 1) * 1,
  toDay: new Date().setHours(23, 59, 59, 999) * 1,
};

export const DefaultDataDateNotDay = {
  year: null,
  fromQuarter: null,
  toQuarter: null,
  fromMonth: null,
  toMonth: null,
  fromWeek: null,
  toWeek: null,
  fromDay: null,
  toDay: null,
};
