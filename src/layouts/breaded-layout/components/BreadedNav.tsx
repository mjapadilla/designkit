import React from 'react';
import { HiChevronRight, HiViewGrid } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { BreadedContext } from '../_Layout';

function BreadedNav({ main }: { main: string }) {
  const { path } = React.useContext(BreadedContext);

  const paths = React.useMemo(() => {
    const list = Object.keys(path)
      .sort((a, b) => a.length - b.length)
      .map((key) => ({
        url: key,
        label: (path as never)[key],
      }));
    return list;
  }, [path]);

  const isMain = paths?.length === 1 && paths[0]?.url === main;

  return (
    <div className="flex items-center gap-1 text-gray-700">
      <Link
        to={main}
        className={isMain ? 'pointer-events-none' : 'pointer-events-auto'}
      >
        <HiViewGrid className="h-4 w-4" />
      </Link>
      {paths.length > 0 && (
        <>
          <HiChevronRight className="h-4 w-4" />
          <div className="flex items-center gap-1">
            {paths.map((x, i) => (
              <React.Fragment key={`${x?.url}-${x?.label}`}>
                {i > 0 && <HiChevronRight className="h-4 w-4" />}
                <Link
                  className="text-xs font-semibold last:text-primary-500"
                  to={x.url}
                >
                  {x.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BreadedNav;
