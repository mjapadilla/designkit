import { isNil } from 'lodash';

export const replaceAllString = (
  str: string,
  target: string,
  replacement = ''
) => {
  if (!str) return '';
  const x = str?.replaceAll(target, replacement);
  return x;
};

export const jsUcFirst = (string: string, replacement = '') => {
  const regEx = /(?:\b|_)([a-z])/g;

  if (string) {
    const x = (string || '')
      .toLowerCase()
      .replace(new RegExp(regEx), (e) => e.toUpperCase());
    return x;
  }
  return replacement;
};

export const jsUcOnlyFirst = (string: string, replacement = '') => {
  if (!string) return replacement;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const stringToUpperCase = (string: string) => {
  if (!isNil(string) && typeof string === 'string') {
    return string.toUpperCase();
  }
  return '';
};

export const stringToLowerCase = (string: string) => {
  if (!isNil(string) && typeof string === 'string') {
    return string.toLowerCase();
  }
  return '';
};
