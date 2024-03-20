import React from 'react';

interface IContext {
  isAuthenticated: boolean;
  setIfAuthenticated: (isAuthenticated: boolean) => void;
}

export const ROOT_SESSION = React.createContext<IContext>({
  isAuthenticated: false,
  setIfAuthenticated: () => {},
});
