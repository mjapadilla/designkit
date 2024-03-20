import { GenericAbortSignal as AbortSignal, AxiosError } from 'axios';

import {
  $req,
  AxiosInterceptor,
  ERROR_PROVIDER,
  ErrorBoundry,
  req,
} from './req';
import QueryProvider, {
  dehydrate,
  END_POINT,
  Hydrate,
  queryClient,
  TOKEN_KEY,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from './store';

export {
  req,
  $req,
  Hydrate,
  ERROR_PROVIDER,
  AxiosError,
  useQuery,
  dehydrate,
  TOKEN_KEY,
  END_POINT,
  useMutation,
  ErrorBoundry,
  queryClient,
  useInfiniteQuery,
  AxiosInterceptor,
};
export type { AbortSignal };

export default QueryProvider;
