import React from 'react';

import { BreadedContext } from '../_Layout';

interface IProps {
  children: React.ReactNode;
  label: string;
  url: string;
}

function BreadedRoute({ children, label, url }: IProps) {
  const { setPath } = React.useContext(BreadedContext);

  React.useEffect(() => {
    setPath((state) => {
      const newState = { ...state };
      newState[url] = label;
      return newState;
    });
    return () => {
      setPath((state) => {
        const oldState = { ...state };
        delete oldState[url];
        return oldState;
      });
    };
  }, [label, setPath, url]);

  return children;
}

export default BreadedRoute;
