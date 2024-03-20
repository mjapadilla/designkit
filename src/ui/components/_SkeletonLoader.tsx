import cn from 'classnames';
import { type ReactNode } from 'react';

interface IProps {
  color?: string;
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
  containerClassName?: string;
}

function SkeletonLoader({
  children,
  className,
  isLoading,
  containerClassName,
  color = 'bg-slate-200',
}: IProps) {
  const cln = cn('animate-pulse rounded h-full', color);

  return (
    <div
      className={cn(
        {
          [cln]: isLoading,
          'h-full': !isLoading,
        },
        className
      )}
      id="skeleton-container"
    >
      <div
        id="skeleton-inner"
        className={cn(
          {
            invisible: isLoading,
            'h-full': !isLoading,
          },
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default SkeletonLoader;
