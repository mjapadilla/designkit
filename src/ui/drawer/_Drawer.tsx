import classNames from 'classnames';
import React from 'react';

type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'full';

const icon = (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="group-hover:text-white h-6 w-6 rounded-full text-primary-500 transition duration-300 ease-in-out"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const renderWidthSize: Record<TSize, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  full: 'max-w-full',
};

const renderHeightSize: Record<TSize, string> = {
  xs: 'h-1/4',
  sm: 'h-1/3',
  md: 'h-1/2',
  lg: 'h-2/3',
  full: 'h-full',
};

type TOrigin =
  | 'right-to-left'
  | 'left-to-right'
  | 'bottom-to-top'
  | 'top-to-bottom';

type TOriginValue = {
  position: string;
  show: string;
  hide: string;
  rounded: string;
};

const renderOrigin: Record<TOrigin, TOriginValue> = {
  'right-to-left': {
    position: 'right-0',
    show: 'translate-x-0',
    hide: 'translate-x-full',
    rounded: 'rounded-none',
  },
  'left-to-right': {
    position: 'left-0',
    show: 'translate-x-0',
    hide: '-translate-x-full',
    rounded: 'rounded-none',
  },
  'bottom-to-top': {
    position: 'bottom-0',
    show: 'translate-y-0',
    hide: 'translate-y-full',
    rounded: 'rounded-t-xl',
  },
  'top-to-bottom': {
    position: 'top-0',
    show: 'translate-y-0',
    hide: '-translate-y-full',
    rounded: 'rounded-b-xl',
  },
};

interface IProps {
  origin?: TOrigin;
  id?: string;
  size?: TSize;
  title?: string;
  targetId?: string;
  defaultvalue?: boolean;
  renderButton?: React.ReactNode | boolean;
  children?: React.ReactNode;
}

function Drawer({
  size = 'md',
  renderButton,
  id = 'drawer',
  title = 'Title',
  children = 'Content',
  defaultvalue = false,
  origin = 'right-to-left',
}: IProps) {
  const [show, setShow] = React.useState<boolean>(defaultvalue);
  const [animate, setAnimate] = React.useState<boolean>(defaultvalue);

  const onShow = React.useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      if (e) e.preventDefault();
      if (!show) {
        document.body.className = 'overflow-hidden';

        setShow(true);
        setTimeout(() => {
          setAnimate(true);
        }, 300);
        return;
      }
      document.body.removeAttribute('class');
      setAnimate(false);
      setTimeout(() => {
        setShow(false);
      }, 300);
    },
    [show]
  );

  const isHorizontal = React.useMemo(
    () => origin === 'left-to-right' || origin === 'right-to-left',
    [origin]
  );
  const isVertical = React.useMemo(
    () => origin === 'top-to-bottom' || origin === 'bottom-to-top',
    [origin]
  );

  React.useMemo(() => {
    const escFunction = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onShow(e);
      }
    };

    if (show) {
      document.addEventListener('keydown', escFunction, false);
    }
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [onShow, show]);

  return (
    <>
      <div
        id={id}
        role="button"
        onClick={onShow}
        className={classNames('drawer', {
          'pointer-events-none': show,
        })}
      >
        {Boolean(renderButton) && renderButton}
      </div>
      {show && (
        <div
          id="drawer-child"
          className="fixed inset-0 z-40 h-full w-full overflow-hidden"
        >
          <div className="fixed inset-0 overflow-hidden">
            <div
              role="presentation"
              onClick={onShow}
              className={classNames(
                'transform-gpu transition-opacity ease-in-out',
                'bg-black fixed inset-0 bg-opacity-30',
                {
                  'opacity-100 duration-300': animate,
                  'opacity-0 duration-200': !animate,
                }
              )}
            />
            <div
              className={classNames(
                'absolute',
                'bg-white p-5',
                'flex flex-col overflow-auto',
                'transform-gpu transition duration-300 ease-in-out',
                renderOrigin[origin]?.position,
                {
                  [renderOrigin[origin]?.rounded]: size !== 'full',
                },
                {
                  [renderOrigin[origin]?.show]: animate,
                  [renderOrigin[origin]?.hide]: !animate,
                },
                {
                  'h-full w-full': isHorizontal,
                  'w-full': isVertical,
                },
                {
                  [renderWidthSize[size]]: isHorizontal,
                  [renderHeightSize[size]]: isVertical,
                }
              )}
            >
              <div className="flex w-full items-center space-x-2">
                <p className="w-full text-xl font-bold">{title}</p>
                <div className="ml-auto">
                  <button
                    type="button"
                    tabIndex={-1}
                    className="group rounded-full p-1 outline-none transition duration-300 ease-in-out hover:bg-primary-500"
                    onClick={onShow}
                  >
                    {icon}
                  </button>
                </div>
              </div>
              <div className="mt-2 flex flex-grow flex-col overflow-hidden">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Drawer;
