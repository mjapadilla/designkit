import cn from 'classnames';
import dayjs from 'dayjs';

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 17l-5-5m0 0l5-5m-5 5h12"
      />
    </svg>
  );
}

interface IProps {
  monthDate: Date;
  customHeaderCount: number;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  monthsShown: number;
}

function CustomHeader({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
  monthsShown,
}: IProps) {
  const isFrom = customHeaderCount === 1;

  return (
    <div className="relative flex items-center justify-center pb-3">
      <button
        type="button"
        className={cn('absolute rounded p-1 px-1.5 hover:bg-gray-100', {
          'right-2 rotate-180': isFrom,
          'left-2': !isFrom,
        })}
        onClick={isFrom ? increaseMonth : decreaseMonth}
      >
        <ArrowIcon />
      </button>

      <div className="text-base font-bold">
        {dayjs(monthDate).format('MMMM YYYY')}
      </div>

      {monthsShown === 1 && (
        <button
          type="button"
          className="absolute right-2 rotate-180 rounded p-1 px-1.5 hover:bg-gray-100"
          onClick={isFrom ? decreaseMonth : increaseMonth}
        >
          <ArrowIcon />
        </button>
      )}
    </div>
  );
}

export default CustomHeader;
