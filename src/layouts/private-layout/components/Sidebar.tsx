import classNames from 'classnames';
import React from 'react';
import { BiArrowToLeft } from 'react-icons/bi';
import { useMatch, useNavigate } from 'react-router-dom';

import { sideBarOutlet } from 'pages/private';

import { SIDEBAR_PROVIDER } from '../_constants';
import Navigation from './Navigation';

function Sidebar() {
  const SIDEBAR_OUTLET = sideBarOutlet();

  const navigate = useNavigate();
  const parentMatch = useMatch('/:module_code/*');
  const { module_code = null } = parentMatch?.params || {};

  const isMounted = React.useRef(true);

  const [animate, setAnimate] = React.useState(false);
  const { show, setShow } = React.useContext(SIDEBAR_PROVIDER);

  const handleOnClose = (e: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!isMounted.current) return;
    if (show) {
      setAnimate(false);
      document.body.removeAttribute('class');
      setTimeout(() => {
        setShow(false);
      }, 300);
    }
  };

  const handleOnCloseTab = () => {
    if (show) {
      setAnimate(false);
      setTimeout(() => {
        document.body.removeAttribute('class');
        setShow(false);
      }, 400);
    }
  };

  React.useEffect(() => {
    if (!isMounted.current) return;
    if (show) {
      document.body.className = 'overflow-hidden';
      setShow(show);
      setTimeout(() => {
        setAnimate(true);
      }, 300);
    }
  }, [setShow, show]);

  React.useEffect(() => {
    if (!module_code && SIDEBAR_OUTLET?.length) {
      navigate(`${SIDEBAR_OUTLET[0]?.to}`);
    }
  }, [SIDEBAR_OUTLET, module_code, navigate]);

  return (
    <>
      {show && (
        <div className="fixed inset-0 z-30 flex">
          <div
            role="button"
            onClick={handleOnClose}
            className={classNames(
              'bg-black fixed h-full w-full bg-opacity-40 transition-opacity duration-500',
              {
                'opacity-100 ease-out': animate,
                'opacity-0 ease-in': !animate,
              }
            )}
          />
          <div className="flex h-full flex-shrink-0">
            <div
              className={classNames(
                'relative flex w-60 flex-col transition duration-200',
                {
                  'translate-x-0 ease-out': animate,
                  '-translate-x-full ease-in': !animate,
                }
              )}
            >
              <Navigation
                module_code={module_code}
                onCloseCallback={handleOnCloseTab}
              />
              <div
                className={classNames(
                  'absolute -right-10 top-2 transition duration-100',
                  {
                    'opacity-100 ease-out': animate,
                    'opacity-0 ease-in': !animate,
                  }
                )}
              >
                <a href="/" onClick={handleOnClose} className="outline-none">
                  <span className="sr-only">Close sidebar</span>
                  <BiArrowToLeft className="text-white h-8 w-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="hidden lg:flex">
        <div className="z-20 flex flex-shrink-0">
          <div className="flex flex-col lg:w-60 2xl:w-64">
            <Navigation module_code={module_code} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
