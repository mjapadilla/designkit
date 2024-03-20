import classNames from 'classnames';

type TColor =
  // SOLID
  | 'solid-success'
  | 'solid-danger'
  | 'solid-warning'
  | 'solid-info'
  | 'solid-primary'
  | 'solid-light'
  // OUTLINE
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-primary'
  | 'outline-light'
  // LIGHT
  | 'light-success'
  | 'light-danger'
  | 'light-warning'
  | 'light-info'
  | 'light-primary'
  | 'light-light';

interface IProps {
  className?: string;
  size?: 'xs' | 'md' | 'sm';
  color?: TColor;
  rounded?: boolean;
  label: string | React.ReactNode;
  leading?: JSX.Element | (() => JSX.Element);
  trailing?: JSX.Element | (() => JSX.Element);
}

const MAP_COLOR_CLASS = {
  // SOLID
  'solid-primary': 'bg-primary-500 text-white',
  'solid-danger': 'bg-red-500 text-white',
  'solid-success': 'bg-green-600 text-white',
  'solid-warning': 'bg-amber-500 text-white',
  'solid-info': 'bg-sky-600 text-white',
  'solid-light': 'bg-zinc-100 text-zinc-800',
  // OUTLINE
  'outline-primary':
    'bg-primary-500/5 text-primary-500 border border-primary-500',
  'outline-danger': 'bg-red-500/5 text-red-500 border border-red-500',
  'outline-success': 'bg-green-600/5 text-green-600 border border-green-600',
  'outline-warning': 'bg-amber-500/5 text-amber-500 border border-amber-500',
  'outline-info': 'bg-sky-600/5 text-sky-600 border border-sky-600',
  'outline-light': 'bg-zinc-100 text-zinc-800 border border-zinc-200',
  // LIGHT
  'light-primary': 'bg-primary-500/10 text-primary-500',
  'light-danger': 'bg-red-500/10 text-red-500',
  'light-success': 'bg-green-600/10 text-green-600',
  'light-warning': 'bg-amber-500/10 text-amber-500',
  'light-info': 'bg-sky-600/10 text-sky-600',
  'light-light': 'bg-zinc-100 text-zinc-800',
};

const MAP_SIZE = {
  xs: 'px-1.5 py-px text-xxs',
  sm: 'px-1.5 py-px text-xs',
  md: 'px-2.5 py-px text-sm',
};

function Badge({
  color,
  label,
  rounded,
  leading,
  trailing,
  className,
  size = 'xs',
}: IProps) {
  return (
    <div
      className={classNames(
        'inline-block items-center truncate text-center font-semibold',
        rounded ? 'rounded-full' : 'rounded',
        MAP_COLOR_CLASS?.[color ?? 'solid-primary'],
        MAP_SIZE?.[size ?? 'xs'],
        'space-x-1',
        className
      )}
    >
      <>
        {leading}
        <div className="truncate whitespace-nowrap">{label}</div>
        {trailing}
      </>
    </div>
  );
}

export default Badge;
