import dayjs from 'dayjs';
import { HiChevronDown } from 'react-icons/hi';

import PopUp from './_PopUp';

const format = 'YYYY-MM-DD';

const TYPE_OPTIONS = [
  {
    label: 'Weekly',
    value: 'DAY',
    date_from: dayjs().subtract(6, 'day').format(format),
    date_to: dayjs().format(format),
  },
  {
    label: 'Monthly',
    value: 'MONTH',
    date_from: dayjs().startOf('year').format(format),
    date_to: dayjs().endOf('year').format(format),
  },
  {
    label: 'Yearly',
    value: 'YEAR',
    date_from: dayjs().startOf('year').subtract(9, 'year').format(format),
    date_to: dayjs().endOf('year').format(format),
  },
];

type TValue = {
  label: string;
  value: string;
  date_from: string;
  date_to: string;
};

interface IProps {
  value: TValue;
  onSubmit: (res: TValue) => void;
}

function RangeType({ value, onSubmit }: IProps) {
  const onClickType = (i: TValue) => (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit(i);
  };

  return (
    <PopUp
      autoClose
      positionClassName="right-0"
      containerClassName="w-auto"
      sizeClassName="w-36"
      render={
        <div className="flex items-center space-x-2">
          <h4 className="text-sm font-semibold leading-4">
            {value?.label ?? 'Select Type'}
          </h4>
          <HiChevronDown className="h-5 w-5" />
        </div>
      }
    >
      <div className="divide-y">
        {TYPE_OPTIONS?.map((i) => (
          <div
            key={i?.value}
            role="button"
            onClick={onClickType(i)}
            className="cursor-pointer px-2.5 py-1.5 text-sm font-medium transition duration-100 ease-in-out hover:bg-slate-100"
          >
            {i?.label}
          </div>
        ))}
      </div>
    </PopUp>
  );
}

export default RangeType;
