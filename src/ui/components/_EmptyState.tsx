import cn from 'classnames';
import { type ReactNode } from 'react';

import { EmptyPlaceholder } from 'assets/images';

interface IProps {
  note?: ReactNode;
  actionButton?: ReactNode;
  className?: string;
  label?: string;
  labelClassName?: string;
}

function EmptyState({
  note,
  className,
  actionButton,
  label = 'No data found.',
  labelClassName = 'text-lg md:text-xl',
}: IProps) {
  return (
    <div className={cn('bg-white h-full w-full bg-opacity-50', className)}>
      <div className="flex h-full flex-col items-center justify-center space-y-3 bg-opacity-50 p-10 text-center">
        <img className="h-56 w-auto" src={EmptyPlaceholder} />
        <div className="text-center">
          <div
            className={cn(
              'text-xl font-semibold leading-normal text-gray-500',
              labelClassName
            )}
          >
            {label}
          </div>
          {note && (
            <div className="mb-4 text-center text-sm font-light text-gray-500">
              {note}
            </div>
          )}
          {actionButton && <div className="mt-3">{actionButton}</div>}
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
