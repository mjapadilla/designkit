import React from 'react';

import { TResponse } from './_types';

interface IContenxt {
  data: TResponse | undefined;
  isLoading: boolean;
}

export const ROOT_PROFILE = React.createContext<IContenxt>({
  data: undefined,
  isLoading: false,
});
