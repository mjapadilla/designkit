import Cookies from 'js-cookie';
import React from 'react';

import { ROOT_PROFILE } from './_constants';
import { useGetProfile } from './_hook';

function ProfileProvider({ children }: { children: React.ReactNode }) {
  const user_key = Cookies.get('_user_key');

  const { data, isLoading } = useGetProfile(user_key ?? '');

  const x = React.useMemo(() => ({ isLoading, data }), [data, isLoading]);

  return <ROOT_PROFILE.Provider value={x}>{children}</ROOT_PROFILE.Provider>;
}

export default ProfileProvider;
