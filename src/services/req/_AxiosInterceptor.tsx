import { AxiosError, AxiosResponse } from 'axios';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'ui/toast';

import { instance } from './_axios';
import { ERROR_PROVIDER } from './_constants';

interface IProps {
  children: ReactNode;
}

interface CustomErrorData {
  error?: string | object;
  message: string;
  errors: string[] | unknown;
}

const AxiosInterceptor = ({ children }: IProps) => {
  const navigate = useNavigate();

  const [error, setError] = React.useState<{ [k: string]: string[] }>({});

  React.useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const { status, data } = error?.response || {};

        const handleResponseError = (
          statusCode: number,
          errorData?: CustomErrorData
        ) => {
          switch (statusCode) {
            case 400:
              break;
            case 401:
              if (
                errorData?.error === 'token_expired' ||
                errorData?.error === 'unauthorized'
              ) {
                navigate('/logout');
              }
              break;
            case 403:
              break;
            case 422:
              break;
            case 500:
              if (errorData?.message) toast.error(errorData?.message);
              break;
            default:
              if (errorData?.message) toast.error(errorData?.message);
              break;
          }
        };

        if (status) {
          handleResponseError(status, data as CustomErrorData);
        }

        return Promise.reject(error); // Reject the promise with the error
      }
    );

    return () => {
      // Remove the interceptor when the component unmounts to avoid memory leaks
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  const err = React.useMemo(() => ({ error, setError }), [error]);

  return (
    <ERROR_PROVIDER.Provider value={err}>{children}</ERROR_PROVIDER.Provider>
  );
};

export default AxiosInterceptor;
