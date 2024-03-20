import React from 'react';

interface IContext {
  error: { [k: string]: string[] };
  setError: React.Dispatch<React.SetStateAction<{ [k: string]: string[] }>>;
}

export const ERROR_PROVIDER = React.createContext<IContext>({
  error: {},
  setError: () => {},
});
