import { isEmpty, isNil, isUndefined, mapValues, omitBy } from 'lodash';

export const removeEmpty = (obj: object) =>
  omitBy(
    obj,
    (x: object | string) =>
      isEmpty(String(x)) || isUndefined(String(x)) || isNil(x)
  );

export const convertNullToStringOfObject = <T extends object>(obj: T) =>
  mapValues(obj, (v) => (v === null ? '' : v));
