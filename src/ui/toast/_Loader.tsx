import classNames from 'classnames';
import React from 'react';

import { renderType } from './_constants';
import { MAP_TYPE } from './_types';

interface IProps {
  type: MAP_TYPE;
  timer: number;
}

function Loader({ type, timer }: IProps) {
  const [pBar, setPBar] = React.useState<number>(100);

  React.useEffect(() => {
    const timeInterval = (timer / 100) * 1;
    const interval = setInterval(() => {
      setPBar(pBar - 1);
    }, timeInterval);
    return () => clearInterval(interval);
  }, [pBar, timer]);

  return (
    <div
      className={classNames('h-1', renderType[type]?.loader)}
      style={{
        width: `${pBar}%`,
      }}
    />
  );
}

export default Loader;
