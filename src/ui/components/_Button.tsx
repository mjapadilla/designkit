import classNames from 'classnames';
import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';
import { AiOutlinePrinter } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import {
  HiArrowNarrowLeft,
  HiArrowNarrowRight,
  HiDownload,
  HiEye,
  HiInformationCircle,
  HiPencil,
  HiPlus,
} from 'react-icons/hi';
import { HiEyeSlash } from 'react-icons/hi2';
import { IoCloseSharp } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

const renderSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const renderIconSize = {
  small: 'h-4 w-4',
  medium: 'h-4 w-4',
  large: 'h-5 w-5',
};

const renderColor = {
  brand: 'brand',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  light: 'light',
  dark: 'dark',
  'brand-outline': 'brand-outline',
  'info-outline': 'info-outline',
  'success-outline': 'success-outline',
  'warning-outline': 'warning-outline',
  'danger-outline': 'danger-outline',
};

const renderFocus = {
  brand: 'brand-focus',
  info: 'info-focus',
  success: 'success-focus',
  warning: 'warning-focus',
  danger: 'danger-focus',
  light: 'light-focus',
  dark: 'dark-focus',
  'brand-outline': 'brand-outline-focus',
  'info-outline': 'info-outline-focus',
  'success-outline': 'success-outline-focus',
  'warning-outline': 'warning-outline-focus',
  'danger-outline': 'danger-outline-focus',
};

const renderIcon = {
  view: HiEye,
  create: HiPlus,
  update: HiPencil,
  unview: HiEyeSlash,
  close: IoCloseSharp,
  download: HiDownload,
  delete: BsTrashFill,
  remove: MdDeleteForever,
  print: AiOutlinePrinter,
  info: HiInformationCircle,
  'arrow-left': HiArrowNarrowLeft,
  'arrow-right': HiArrowNarrowRight,
};

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof renderSize;
  color?: keyof typeof renderColor;
  focus?: boolean;
  isLoading?: boolean;
  withLoader?: boolean;
  label?: string | ReactNode;
  leading?: keyof typeof renderIcon | ReactElement;
  trailing?: keyof typeof renderIcon | ReactElement;
}

function Button({
  label,
  focus,
  leading,
  trailing,
  isLoading,
  withLoader,
  color = 'brand',
  size = 'medium',
  ...rest
}: IProps) {
  const renderLabel = React.useMemo(() => {
    if (leading || trailing) {
      const IconLeft =
        typeof leading === 'string' ? renderIcon[leading] : undefined;
      const IconRight =
        typeof trailing === 'string' ? renderIcon[trailing] : undefined;
      return (
        <div className="flex h-full items-center gap-1">
          {IconLeft ? (
            <IconLeft className={classNames(renderIconSize[size])} />
          ) : (
            leading
          )}

          <h4>{label}</h4>
          <div
            className={classNames({
              'ml-3': IconLeft && IconRight,
            })}
          >
            {IconRight ? (
              <IconRight className={classNames(renderIconSize[size])} />
            ) : (
              trailing
            )}
          </div>
        </div>
      );
    }
    return label;
  }, [leading, trailing, label, size]);

  return (
    <button
      type="button"
      {...rest}
      disabled={rest?.disabled || isLoading}
      className={cn('btn', renderSize[size], [renderColor[color]], {
        '!cursor-wait': isLoading,
        [renderFocus[color]]: focus || isLoading,
        disabled: rest?.disabled && !isLoading,
        loading: isLoading,
        [String(rest?.className)]: rest?.className,
      })}
    >
      {isLoading && withLoader ? 'Loading...' : renderLabel}
    </button>
  );
}

export default Button;
