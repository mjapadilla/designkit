import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { $req, AxiosError, TOKEN_KEY, useMutation } from 'services';

import { useErrorNotice } from 'hooks/setErrorNotice';

import { storage, stringToUpperCase } from 'utils';

import { TPayload, TResponse } from '../_types';

const login = (payload: TPayload) => {
  // eslint-disable-next-line no-console
  console.log(payload, ' here');
  return $req.post<{ data: TResponse }>({
    transform: {
      data: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd3MtdjItZGV2LmF1dG9wYXkucGgvY29yZV9hdXRoL2xvZ2luIiwiaWF0IjoxNzA3Mzc3OTg2LCJleHAiOjE3MDc0NjQzODYsIm5iZiI6MTcwNzM3Nzk4NiwianRpIjoiRmQwYldGOWNFeXBWNGxldyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlcl91dWlkIjoiOWExZDkwMWUtZjk3MS00MTYxLTgwZTctNWNjYWJlMjhlZjg2Iiwib3JnYW5pemF0aW9uX3V1aWQiOm51bGwsInByb3ZpZGVyX2lkIjpudWxsLCJ0eXBlIjoiYWRtaW4iLCJyb2xlIjoxLCJzY29wZSI6ImRhc2hib2FyZDpyd2R1IGhvbWU6ciB0cmFuc2l0X2xvZ3M6cndkdSBvcGVyYXRvcl9wcm9maWxlOnJ3dSB1c2VyX21hbmFnZW1lbnQ6cndkdSBidXNpbmVzc19jYXRlZ29yeTpyd2R1IGNpdHlfbWFuYWdlbWVudDpyd2R1IiwidXNlcl9sZXZlbCI6IkFETUlOIn0.eMVxc85qRofWZqkkgi_F2U06k2W6nAqAX33fJ2wR2Xw',
      },
    },
  });
};

const useLogin = ({ onSuccess = () => {} }: { onSuccess?: () => void }) => {
  const { setError } = useErrorNotice();
  return useMutation({
    mutationFn: login,
    mutationKey: ['LOGIN'],
    onSuccess: (res) => {
      const { token } = res?.data ?? {};
      const decoded: {
        user_level: 'ADMIN';
        organization_uuid: string;
        scope: string;
      } = jwtDecode(token);

      Cookies.set('_level', stringToUpperCase(decoded?.user_level));
      Cookies.set(TOKEN_KEY, token);
      Cookies.set('_user_key', `${new Date().getTime()}`);

      const scopesArray = (decoded?.scope || '').split(' ');

      const permissions = decoded?.scope
        ? scopesArray
            .map((scp) => {
              const parts = scp.split(':');
              const first = parts[0];
              const second = parts[1].split('');
              const formattedSecond = second.map((char) => `${first}-${char}`);
              return formattedSecond;
            })
            .flat()
        : [];

      storage?.set('permissions', [
        ...permissions,
        // TODO: Remove this code is api is ready
        'static-r',
        'static-w',
        'static-u',
        'static-d',
      ]);
      if (onSuccess) onSuccess();
    },
    onError: (res: AxiosError) => {
      setError('login', res);
    },
  });
};

export default useLogin;
