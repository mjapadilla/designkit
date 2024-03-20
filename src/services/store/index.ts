import Cookies from 'js-cookie';

import {
  dehydrate,
  END_POINT,
  Hydrate,
  queryClient,
  TOKEN_KEY,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from './_config';
import QueryProvider from './_QueryProvider';

const APP_TOKEN = Cookies.get(TOKEN_KEY);

export {
  Hydrate,
  useQuery,
  dehydrate,
  APP_TOKEN,
  TOKEN_KEY,
  END_POINT,
  queryClient,
  useMutation,
  useInfiniteQuery,
};

export default QueryProvider;
