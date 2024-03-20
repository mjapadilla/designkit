import React from 'react';

interface ISideBar {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const SIDEBAR_PROVIDER = React.createContext<ISideBar>({
  show: false,
  setShow: () => {},
});
