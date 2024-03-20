import classNames from 'classnames';
import React from 'react';

import { TDirectory } from 'types';

import { mergeClasses } from 'utils';

import Button from './_Button';
import SkeletonLoader from './_SkeletonLoader';

interface IProps {
  tabs: TDirectory[];
  isLoading?: boolean;
  type?: 'BUTTON' | 'LINK';
  selected: string | unknown;
  onClick: (rt: string) => void;
}

function TabNavigation({
  tabs,
  onClick,
  selected,
  type = 'BUTTON',
  isLoading = false,
}: IProps) {
  const handleOnClick = (i: TDirectory) => (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(i?.to);
  };

  React.useEffect(() => {
    const x = setTimeout(() => {
      if (tabs.length > 0 && !selected) {
        onClick(tabs[0]?.to);
      }
    }, 300);

    return () => clearTimeout(x);
  }, [onClick, selected, tabs]);

  if (tabs?.length === 0) return <div />;
  return (
    <div className={mergeClasses('flex', type === 'LINK' ? 'gap-5' : 'gap-3')}>
      {tabs.map((i) => {
        const isActive = i?.key === selected;

        if (type === 'LINK') {
          return (
            <SkeletonLoader isLoading={isLoading} key={i?.key}>
              <Button
                label={i?.name}
                size="small"
                className={mergeClasses(
                  'ease-out-in flex-shrink-0 rounded-none border-b-2 px-0 font-medium transition duration-300',

                  isActive
                    ? 'border-primary-400 text-primary-500'
                    : 'border-transparent text-slate-500 hover:border-slate-400'
                )}
                onClick={handleOnClick(i)}
              />
            </SkeletonLoader>
          );
        }
        return (
          <SkeletonLoader isLoading={isLoading} key={i?.key}>
            <Button
              size="small"
              label={i?.name}
              className={classNames(
                'btn min-h-0 flex-shrink-0 rounded-md px-2 py-1 text-sm font-semibold',
                {
                  'active-link': isActive,
                  link: !isActive,
                }
              )}
              onClick={handleOnClick(i)}
            />
          </SkeletonLoader>
        );
      })}
    </div>
  );
}

export default TabNavigation;
