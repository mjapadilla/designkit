export type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const renderModalSize = {
  xs: 'max-w-lg',
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-sm lg:max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
};

export type TColor = 'white' | 'primary';

export interface IProps {
  id?: string;
  size?: TSize;
  title?: string;
  description?: string;
  color?: TColor;
  headerClassName?: string;
  className?: string;
  renderButton?: React.ReactNode | boolean;
  children?: React.ReactNode;
}

export const renderColor: Record<TColor, string> = {
  white: 'bg-white text-inherit',
  primary: 'bg-primary-500 text-white',
};

export type TType = 'success' | 'danger' | 'info';

export type TExtendProps = {
  type?: TType;
  yesLabel?: string;
  noLabel?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onYes?: ({ cb }: { cb: () => void }) => void;
  onNo?: ({ cb }: { cb: () => void }) => void;
  onClose?: () => void;
};
