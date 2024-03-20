export const INIT_FILTER = {
  page: 1,
  per_page: 25,
  status: '',
  order_by: {
    label: 'DATE',
    value: 'date',
  },
  sort_by: {
    label: 'DESCENDING',
    value: 'desc',
  },
  keyword: '',
};

export const SORTBY_OPTIONS = [
  {
    label: 'DESCENDING',
    value: 'desc',
  },
  {
    label: 'ASCENDING',
    value: 'asc',
  },
];

export const ORDERBY_OPTIONS = [
  {
    label: 'DATE CREATED',
    value: 'desc',
  },
];
