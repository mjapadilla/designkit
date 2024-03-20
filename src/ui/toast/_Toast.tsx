import classNames from 'classnames';
import ReactDOM from 'react-dom/client';

import { renderType } from './_constants';
import Loader from './_Loader';
import { toastUniqueID } from './_ToastMarker';
import { IOptions } from './_types';

let appRoot: ReactDOM.Root | null = null;
let toastTimeout: NodeJS.Timeout;

const wait = (t: number) =>
  new Promise((r) => {
    setTimeout(r, t);
  });

const toast = async (
  content: string,
  options: IOptions = {
    title: false,
    timeout: 4000,
    type: 'success',
    position: 'top-right',
  }
) => {
  const opt = {
    timeout: 4000,
    ...options,
  };
  const root = document.getElementById(toastUniqueID) as HTMLElement;
  if (!appRoot) appRoot = ReactDOM.createRoot(root);

  if (!root) {
    return alert('Toast root not found!'); // eslint-disable-line
  }

  const close = async () => {
    appRoot?.render(null);
  };

  close();
  await wait(5);

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(
    () => {
      close();
    },
    (opt?.timeout || 4000) + 400
  );

  return appRoot.render(
    <div
      className={classNames(
        'm-h-20 fixed z-50 w-80 md:absolute md:w-96 xs:w-72',
        opt?.position
      )}
    >
      <div className="toast-entrance h-full w-full overflow-hidden rounded-lg shadow-xl">
        <div className={classNames('h-full', renderType[opt?.type]?.bg)}>
          <div className="relative flex p-4">
            <div className="flex-shrink-0">
              <svg
                className={classNames('h-8 w-8', renderType[opt?.type]?.color)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                {renderType[opt?.type]?.icon}
              </svg>
            </div>
            <div className="ml-3">
              <div className={renderType[opt?.type]?.color}>
                <h3 className="text-sm font-semibold">
                  {opt?.title ? opt?.title : renderType[opt?.type]?.title}
                </h3>
                <div className="text-sm">{content}</div>
              </div>
            </div>
            <div className="absolute right-3 top-3">
              <span
                role="presentation"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  close();
                }}
              >
                <svg
                  className={classNames(
                    'h-4 w-4',
                    renderType[opt?.type]?.color
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
          <Loader type={opt?.type} timer={opt?.timeout} />
        </div>
      </div>
    </div>
  );
};

export const success = (
  content: string,
  options: IOptions = {
    type: 'success',
    position: 'top-right',
  }
) => toast(content, options);

export const warning = (
  content: string,
  options: IOptions = {
    type: 'warning',
    position: 'top-right',
  }
) => toast(content, options);

export const info = (
  content: string,
  options: IOptions = {
    type: 'info',
    position: 'top-right',
  }
) => toast(content, options);

export const error = (
  content: string,
  options: IOptions = {
    type: 'error',
    position: 'top-right',
  }
) => toast(content, options);
