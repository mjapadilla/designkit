import dayjs from 'dayjs';

export const DATE_RANGE_OPTS = [
  {
    label: 'Custom',
    value: '',
    data: {
      from: '',
      to: '',
    },
  },
  {
    label: 'Today',
    value: 'today',
    data: {
      from: dayjs(),
      to: dayjs(),
    },
  },
  {
    label: 'Yesterday',
    value: 'yesterday',
    data: {
      from: dayjs().subtract(1, 'days'),
      to: dayjs().subtract(1, 'days'),
    },
  },
  {
    label: 'Last 7 Days',
    value: 'last_7_days',
    data: {
      from: dayjs().subtract(7, 'days'),
      to: dayjs(),
    },
  },
  {
    label: 'Last 30 Days',
    value: 'last_30_days',
    data: {
      from: dayjs().subtract(30, 'days'),
      to: dayjs(),
    },
  },
  {
    label: 'Last 60 Days',
    value: 'last_60_days',
    data: {
      from: dayjs().subtract(60, 'days'),
      to: dayjs(),
    },
  },
  {
    label: 'Last 90 Days',
    value: 'last_90_days',
    data: {
      from: dayjs().subtract(90, 'days'),
      to: dayjs(),
    },
  },
  {
    label: 'Last Month',
    value: 'last_month',
    data: {
      from: dayjs().subtract(1, 'months').startOf('month'),
      to: dayjs().subtract(1, 'months').endOf('month'),
    },
  },
  {
    label: 'Last Year',
    value: 'last_year',
    data: {
      from: dayjs().subtract(1, 'years').startOf('year'),
      to: dayjs().subtract(1, 'years').endOf('year'),
    },
  },
] as const;
