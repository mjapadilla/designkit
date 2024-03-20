import classNames from 'classnames';
import React from 'react';

interface IProps {
  id?: string;
  children: React.ReactNode;
  render: React.ReactNode;
  autoClose?: boolean;
  withClose?: boolean;
  sizeClassName?: string;
  containerClassName?: string;
  positionClassName?: string;
}

function PopUp({
  children,
  render,
  id = 'option-menu',
  autoClose = false,
  containerClassName,
  sizeClassName = 'w-56',
  positionClassName = 'right-0',

  withClose = false,
}: IProps) {
  const [animate, setAnimate] = React.useState(false);
  const [isShow, setIfShow] = React.useState(false);

  const onShow = React.useCallback(() => {
    if (!isShow) {
      setIfShow(true);
      setTimeout(() => {
        setAnimate(true);
      }, 100);
      return;
    }
    setAnimate(false);
    setTimeout(() => {
      setIfShow(false);
    }, 100);
  }, [isShow]);

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShow();
  };

  React.useEffect(() => {
    const handleClearToggle = (e: MouseEvent) => {
      try {
        const elem: HTMLElement | null = document.getElementById(id);
        if (elem && e.target !== elem && !elem.contains(e.target as Node)) {
          onShow();
        }
      } catch (error) {
        // do nothing...
      }
    };

    if (autoClose && isShow) {
      document.addEventListener('click', handleClearToggle, false);
    }
    return () => {
      document.removeEventListener('click', handleClearToggle, false);
    };
  }, [autoClose, id, isShow, onShow]);

  React.useEffect(() => {
    const escFunction = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onShow();
      }
    };

    if (isShow) {
      document.addEventListener('keydown', escFunction, false);
    }
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [autoClose, isShow, onShow]);

  return (
    <div
      className={classNames(
        'relative inline-block w-full text-left',
        containerClassName
      )}
    >
      <div onClick={handleOnClick} role="button" className="cursor-pointer">
        <span className="sr-only">Open options</span>
        {render}
      </div>
      {isShow && (
        <div
          id={id}
          className={classNames(
            'overflow-hidden',
            'transform transition duration-100 ease-out',
            'bg-white ring-black absolute z-40 origin-top rounded-md shadow-lg ring-1 ring-opacity-5 focus:outline-none',
            {
              'scale-100 opacity-100': animate,
              'scale-95 opacity-0': !animate,
            },
            positionClassName,
            sizeClassName
          )}
        >
          {withClose && (
            <button
              type="button"
              onClick={handleOnClick}
              className="absolute right-0 top-0 p-2"
            >
              <svg
                className="h-4 w-4 text-gray-500 hover:text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {autoClose ? (
            <div onClick={handleOnClick} role="button">
              {children}
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}

export default PopUp;
