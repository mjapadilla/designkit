import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

import { removeEmpty } from 'utils';

import { END_POINT, TOKEN_KEY } from '../store';

type TParams<T> = {
  url: string;
  params?: object;
  payload?: object;
  transform?: (res: T) => T;
};

type TPayload<T> = {
  url: string;
  payload?: object;
  transform?: (res: T) => T;
};

const isOffline = JSON.parse(import.meta.env.VITE_OFFLINE_MODE || 'false');

export const instance: AxiosInstance = axios.create({
  baseURL: END_POINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 180000,
  validateStatus: (status) => status >= 200 && status < 300,
});

instance.interceptors.request.use((config): InternalAxiosRequestConfig => {
  const token = Cookies.get(TOKEN_KEY);

  if (token) {
    const $config = config;
    $config.headers.Authorization = `Bearer ${token}`;
    $config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

const post = async <T>(
  { url, payload, transform }: TPayload<T>,
  axiosConfig?: AxiosRequestConfig
): Promise<T> => {
  if (isOffline) {
    return { message: 'Offline Mode' } as T;
  }

  const res = await instance
    .post(url, payload, axiosConfig)
    .then((response) => response)
    .catch((response) => response);

  if (res?.name === 'AxiosError') {
    throw res;
  }
  if (typeof transform === 'function') {
    const x = transform(res?.data || {});
    return x;
  }

  return res?.data as T;
};

const get = async <T>(
  { url, params, transform }: TParams<T>,
  axiosConfig?: AxiosRequestConfig
): Promise<T> => {
  if (isOffline) {
    return { message: 'Offline Mode' } as T;
  }
  const res = await instance
    .get(url, {
      ...axiosConfig,
      ...(params
        ? {
            params: removeEmpty(params),
          }
        : {}),
    })
    .then((response) => response?.data)
    .catch((response) => response);

  if (res?.name === 'AxiosError') {
    throw res;
  }

  if (typeof transform === 'function') {
    const x = transform(res);
    return x;
  }

  return res?.data;
};

const put = async <T>(
  { url, payload, transform }: TPayload<T>,
  axiosConfig?: AxiosRequestConfig
): Promise<T> => {
  if (isOffline) {
    return { message: 'Offline Mode' } as T;
  }

  const res = await instance
    .put(url, payload, axiosConfig)
    .then((response) => response)
    .catch((response) => response);

  if (res?.name === 'AxiosError') {
    throw res;
  }

  if (typeof transform === 'function') {
    const x = transform(res);
    return x;
  }

  return res?.data;
};

const patch = async <T>(
  { url, payload, transform }: TPayload<T>,
  axiosConfig?: AxiosRequestConfig
): Promise<T> => {
  if (isOffline) {
    return { message: 'Offline Mode' } as T;
  }

  const res = await instance
    .patch(url, payload, axiosConfig)
    .then((response) => response)
    .catch((response) => response);
  if (res?.name === 'AxiosError') {
    throw res;
  }
  if (typeof transform === 'function') {
    const x = transform(res);
    return x;
  }

  return res?.data;
};

const remove = async <T>({
  url,
  payload,
  transform,
}: TPayload<T>): Promise<T> => {
  if (isOffline) {
    return { message: 'Offline Mode' } as T;
  }

  const res = await instance
    .delete(url, { data: payload })
    .then((response) => response)
    .catch((response) => response);
  if (res?.name === 'AxiosError') {
    throw res;
  }
  if (typeof transform === 'function') {
    const x = transform(res);
    return x;
  }

  return res?.data;
};

export { post, get, put, patch, remove };
