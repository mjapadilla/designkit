import Cookie from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROOT_SESSION } from 'context/session';

import { Brand } from 'ui/components';

import { storage } from 'utils';

function Logout() {
  const navigate = useNavigate();

  const { setIfAuthenticated } = React.useContext(ROOT_SESSION);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIfAuthenticated(false);
      storage.clear();
      Cookie.remove('_token');
      Cookie.remove('_level');
      Cookie.remove('_user_key');
      navigate('/');
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [navigate, setIfAuthenticated]);

  return (
    <div className="fixed inset-0 h-screen w-screen bg-zinc-900">
      <div className="flex h-full flex-col items-center justify-center space-y-2 text-neutral-50">
        <Brand
          imgClassName="h-10 w-auto"
          labelClassName="text-white"
          type="white"
        />
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-lg font-medium tracking-wide">Signing out.</h4>
          <div className="flex items-center space-x-2">
            <svg
              className="h-3 w-3 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-xs font-semibold tracking-normal">
              Please wait...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
