import cn from 'classnames';

interface IProps {
  label?: string;
  className?: string;
  labelClassName?: string;
}

function PageLoader({
  className,
  labelClassName,
  label = 'Loading...',
}: IProps) {
  return (
    <div
      className={cn(
        'bg-white pointer-events-none flex h-full w-full',
        className
      )}
    >
      <div className="m-auto">
        <div className="flex items-center space-x-2">
          <svg
            className="h-5 w-5 animate-spin "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <h4 className={cn('text-xl font-medium', labelClassName)}>{label}</h4>
        </div>
      </div>
    </div>
  );
}

export default PageLoader;
