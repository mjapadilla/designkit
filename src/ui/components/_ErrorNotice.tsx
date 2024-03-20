import { isEmpty } from 'lodash';
import React from 'react';

import { useErrorNotice } from 'hooks/setErrorNotice';

import { mergeClasses } from 'utils';

interface IProps {
  id: string;
  className?: string;
}

function _ErrorNotice({ id, className }: IProps) {
  const { error, updateError } = useErrorNotice();

  React.useLayoutEffect(() => {
    updateError((prev) => ({
      ...prev,
      [id]: [],
    }));
  }, [id, updateError]);

  if (error[id] === undefined || error[id]?.length < 1) return null;

  if (!(id in error) && !isEmpty(error)) {
    // eslint-disable-next-line no-console
    console.warn(
      `ErrorNotice with '${id}' id is not one of the expected setErrors IDs.`
    );
  }

  return (
    <div
      id="error-401"
      className={mergeClasses(
        'rounded-md border border-red-500 bg-red-50 px-4 py-3',
        className
      )}
    >
      <ul className="ml-5 list-disc">
        {error[id]?.map((i) => (
          <li key={i} className="text-semibold text-sm text-red-500">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ErrorNotice = React.memo(_ErrorNotice);

ErrorNotice.displayName = 'ErrorNotice';

export default ErrorNotice;
