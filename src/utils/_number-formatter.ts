import { isNaN } from 'lodash';

export const parseNumber = (str: string, default_value: boolean = false) => {
  const v = parseFloat(`${str}`.replace(/,/g, ''));
  if (isNaN(v)) return typeof default_value !== 'boolean' ? default_value : str;
  return v;
};

export const formatNumber = (v: string, decimal: number = 2) => {
  try {
    const n = parseNumber(v);
    if (isNaN(n)) return v;
    return n.toLocaleString(undefined, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    });
  } catch (err) {
    return v;
  }
};

export const formatCurrency = (
  value: string,
  currency: string = 'PHP',
  fraction: number = 2
) => {
  const x = Number.isInteger(Number(value)) ? 0 : fraction;

  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: x,
    currencyDisplay: 'narrowSymbol',
  }).format(Number(value));
};
