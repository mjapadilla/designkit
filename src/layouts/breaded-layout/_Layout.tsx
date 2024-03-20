import React from 'react';

interface IProps {
  path: object;
  setPath: React.Dispatch<React.SetStateAction<{ [x: string]: string }>>;
}

export const BreadedContext = React.createContext<IProps>({
  path: [],
  setPath: () => {},
});

function Layout({ children }: { children: React.ReactNode }) {
  const [path, setPath] = React.useState({});

  const x = React.useMemo(() => ({ path, setPath }), [path]);

  return (
    <BreadedContext.Provider value={x}>{children}</BreadedContext.Provider>
  );
}

export default Layout;
