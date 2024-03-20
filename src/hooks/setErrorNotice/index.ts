import React from 'react';

import { AxiosError, ERROR_PROVIDER } from 'services';

interface CustomErrorData {
  error?: string | object;
  message: string;
  errors: string[] | unknown;
}

export const useErrorNotice = () => {
  const { error, setError: updateError } = React.useContext(ERROR_PROVIDER);
  const setError = (id: string, err: AxiosError) => {
    const { status, data } = err?.response || {};

    const handleResponseError = (errData: CustomErrorData) => {
      if (status === 400 || status === 401 || status === 403) {
        return [errData?.message];
      }
      if (status === 422) {
        const { errors } = errData ?? {};
        if (errors) {
          const x = Object?.keys(errors)?.map((k: string) => {
            const e = (errors as never)[k][0];
            return e;
          });
          return x;
        }
        return [];
      }
      return [];
    };

    const x = handleResponseError(data as CustomErrorData);
    updateError((prev) => ({
      ...prev,
      [id]: x,
    }));
  };
  return { error, setError, updateError };
};
