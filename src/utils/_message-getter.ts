import { get } from 'lodash';

import { jsUcOnlyFirst } from './_string-formatter';

export const getFirstMessage = (data: object) => {
  if (!data) return '';
  let firstMessage = '';
  let x = 0;

  Object.keys(data).map((i) => {
    if (x === 0) {
      firstMessage =
        get((data as never)[i], 'details') ??
        get((data as never)[i], 'detail') ??
        get((data as never)[i], 'message') ??
        get((data as never)[i], '0');
    }

    x += 1;
    return x;
  });

  return Array.isArray(firstMessage)
    ? jsUcOnlyFirst(firstMessage[0])
    : jsUcOnlyFirst(firstMessage);
};
