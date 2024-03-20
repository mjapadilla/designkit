import type dayjs from 'dayjs';

type MAP_LABEL =
  | 'Custom'
  | 'Today'
  | 'Yesterday'
  | 'Last 7 Days'
  | 'Last 30 Days'
  | 'Last 60 Days'
  | 'Last 90 Days'
  | 'Last Month'
  | 'Last Year';

type MAP_VALUE =
  | ''
  | 'today'
  | 'yesterday'
  | 'last_7_days'
  | 'last_30_days'
  | 'last_60_days'
  | 'last_90_days'
  | 'last_month'
  | 'last_year';

export type TValue = {
  label?: MAP_LABEL | string;
  value?: MAP_VALUE | string;
  data?: {
    from?: dayjs.Dayjs | string;
    to?: dayjs.Dayjs | string;
  };
};

export const DAY_ABBREVIATION_MAP: Record<string, string> = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
};
