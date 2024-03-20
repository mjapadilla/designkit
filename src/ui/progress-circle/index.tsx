interface IProps {
  value: number;
  total: number;
}

function ProgressCircle({ value = 0, total = 100 }: IProps) {
  if (value > total) {
    // eslint-disable-next-line no-console
    console.warn('Value cannot be greater than total.');
  }

  const circumference = 25 * 2 * Math.PI;
  const percent = (value / total) * 100;

  const offset = ((100 - percent) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full">
      <svg className="h-20 w-20">
        <circle
          className="text-blue-100"
          strokeWidth="6"
          stroke="currentColor"
          fill="transparent"
          r="25"
          cx="40"
          cy="40"
        />
        <circle
          className="text-blue-600"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="25"
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute text-lg text-blue-700">{value}</span>
    </div>
  );
}

export default ProgressCircle;
