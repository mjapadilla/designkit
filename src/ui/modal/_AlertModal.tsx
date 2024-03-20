import classNames from 'classnames';
import React from 'react';

import { renderIcon } from './_constants';
import { IProps, renderModalSize, TExtendProps } from './_types';

function AlerModal({
  id,
  children,
  onYes,
  onNo,
  onClose,
  title = 'Modal title',
  renderButton,
  isLoading = false,
  disabled = false,
  size = 'xs',
  type = 'success',
  yesLabel = 'Confirm',
  noLabel = 'Cancel',
}: IProps & TExtendProps) {
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
          if (onClose) onClose();
        }, 300);
        return;
      }
      document.body.removeAttribute('class');
      setAnimate(false);
      setTimeout(() => {
        setShow(false);
      }, 300);
    },
    [onClose, show]
  );

  const onClickYes = (e: React.MouseEvent) => {
    e.preventDefault();

    if (onYes) {
      onYes({
        cb: () => onShow(e),
      });
      return;
    }
    onShow(e);
  };

  const onClickNo = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNo) {
      onNo({
        cb: () => onShow(e),
      });
      return;
    }
    onShow(e);
  };

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
        className={classNames('alert-modal', {
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
              <div className="flex space-x-5 px-8 pb-6 pt-8">
                <div className="flex-shrink-0">{renderIcon[type]}</div>
                <div className="ml-auto space-y-px">
                  <p className="w-full text-lg font-semibold">{title}</p>
                  <div>{children}</div>
                  <div className="flex pt-4">
                    <div className="ml-auto space-x-3">
                      <button
                        type="button"
                        onClick={onClickNo}
                        disabled={isLoading}
                        className="md line btn w-28"
                      >
                        {noLabel}
                      </button>
                      <button
                        type="button"
                        onClick={onClickYes}
                        disabled={isLoading || disabled}
                        className={classNames('md btn dark w-28', {
                          'cursor-wait': isLoading,
                        })}
                      >
                        {yesLabel}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AlerModal;
