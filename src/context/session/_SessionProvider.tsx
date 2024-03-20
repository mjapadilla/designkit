import React from 'react';

import { ROOT_SESSION } from './_constants';
import { useAuth } from './_hooks';

type Props = {
  children?: React.ReactNode;
};

function SessionProvider({ children = 'Children' }: Props) {
  const [, authenticated] = useAuth();

  const [isAuthenticated, setIfAuthenticated] = React.useState(authenticated);

  const x = React.useMemo(
    () => ({ isAuthenticated, setIfAuthenticated }),
    [isAuthenticated]
  );

  return <ROOT_SESSION.Provider value={x}>{children}</ROOT_SESSION.Provider>;
}

export default SessionProvider;
