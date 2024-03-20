import { $req, AbortSignal, useQuery } from 'services';

import { transformResponse } from './_transfomers';
import { TResponse } from './_types';

const getProfile = (signal?: AbortSignal) => {
  // eslint-disable-next-line
  console.log(signal);
  return $req.get<TResponse>({
    transform: {
      id: 12345,
      uuid: 'rfk101k23ossdfljh1o2381232k546jlk678j6l7kj324bjhk2h34j4k5j6h2n34234k12sdf3123f1d123',
      email: 'pipz@email.com',
      is_active: true,
      created_at: '2020-12-12',
      updated_at: '2020-12-12',
      profile: {
        id: 67890,
        first_name: 'Pipz',
        middle_name: 'Alvarez',
        last_name: 'Padilla',
        created_at: '2020-12-12',
        updated_at: '2020-12-12',
        mobile_number: '09209841223',
      },
      role: {
        id: 11223344,
        name: 'ADMIN',
        slug: 'admin',
        code: 'admin',
        is_active: 1,
        created_at: '2020-12-12',
        updated_at: '2020-12-12',
      },
      human_role_name: '',
      human_full_name: '',
    },
  });
};

export const useGetProfile = (user_key: string) =>
  useQuery({
    queryFn: ({ signal }) => getProfile(signal),
    queryKey: ['PROFILE', user_key],
    enabled: !!user_key,
    select: (data) => transformResponse(data),
  });
