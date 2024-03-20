import classNames from 'classnames';
import React from 'react';

import { mergeClasses } from 'utils';

import { closeIcon } from './_constants';
import { IProps, renderColor, renderModalSize } from './_types';

function Modal({
  id,
  children,
  renderButton,
  size = 'sm',
  title = 'Modal Title',
  color = 'primary',
  description,
  headerClassName,
  className,
}: IProps) {
  const [show, setShow] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);

  const onShow = React.useCallback(
    (e: React.MouseEvent | KeyboardEvent | React.FormEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
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
        className={classNames('modal', {
          'pointer-events-none': show,
        })}
      >
        {Boolean(renderButton) && renderButton}
      </div>
      {show && (
        <div
          id="modal-child"
          className="fixed inset-0 z-40 h-full w-full overflow-hidden"
        >
          <div className="fixed inset-0 flex overflow-hidden">
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
                'bg-white  z-10 m-auto w-full overflow-hidden rounded-md shadow-xl',
                {
                  'translate-y-4 opacity-100 duration-300 ease-out sm:scale-100':
                    animate,
                  'translate-y-0 opacity-0 duration-200 ease-in sm:scale-90':
                    !animate,
                },
                [renderModalSize[size]]
              )}
            >
              {title && (
                <div
                  className={classNames(
                    `flex w-full items-center ${renderColor[color]} px-5 py-2`,
                    headerClassName
                  )}
                >
                  <div>
                    <p className="modal-title">{title}</p>
                    {description && (
                      <p className="modal-title-description">{description}</p>
                    )}
                  </div>
                  <div className="ml-auto flex items-center">
                    <button
                      type="button"
                      tabIndex={-1}
                      className={`group rounded-full p-1 outline-none`}
                      onClick={onShow}
                    >
                      {closeIcon}
                    </button>
                  </div>
                </div>
              )}

              <div
                className={mergeClasses('min-h-[150px] px-5 py-3', className)}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
