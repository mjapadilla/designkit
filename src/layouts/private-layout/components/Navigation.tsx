import classNames from 'classnames';
import React from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { Link, Navigate, useMatch } from 'react-router-dom';

import { TDirectory } from 'types';

import { sideBarMenu } from 'pages/private';

import { Brand } from 'ui/components';

import { replaceAllString } from 'utils';

interface IProps {
  module_code: string | unknown;
  onCloseCallback?: () => void;
}

function Navigation({ module_code }: IProps) {
  const sideBar = sideBarMenu();
  const match = useMatch(`${module_code}/:sub_module_code/*`);
  const { sub_module_code = null } = match?.params || {};

  const renderSubNav = React.useCallback(
    (rt: TDirectory[]) =>
      rt?.map((i) => {
        const { to, key, name } = i;
        const isActive = sub_module_code === key;

        return (
          <Link
            key={key}
            to={`${module_code}${to}`}
            className={classNames(
              'group z-20 my-1 flex items-center gap-5 py-[2px]',
              'ease-out-in transition duration-200',
              {
                'bg-primary-600 text-slate-50': isActive,
                'text-slate-50 hover:text-primary-500': !isActive,
              },
              {
                'pointer-events-none': isActive,
              }
            )}
            title={name}
          >
            <div
              className={classNames(
                'z-20 h-9 w-1 rounded-r bg-slate-50',
                'ease-out-in transform transition duration-200',
                {
                  'opacity-100': isActive,
                  'opacity-0': !isActive,
                }
              )}
            />
            <div className="flex items-center space-x-2">
              <div className="invisible h-4 w-4" />
              <span className="text-xs font-semibold lg:text-sm">{name}</span>
            </div>
          </Link>
        );
      }),
    [module_code, sub_module_code]
  );

  return (
    <div className="flex h-full overflow-hidden border-r border-gray-200 bg-white-50">
      <div className="flex h-full w-full flex-col overflow-hidden py-6">
        <div className="flex flex-col px-4">
          <div className="mx-auto flex flex-shrink-0">
            <Brand
              imgClassName="h-8 w-auto"
              labelClassName="text-white text-xl font-semibold"
              type="white"
            />
          </div>
        </div>
        <nav
          aria-label="Sidebar"
          className="mt-6 flex flex-col justify-start overflow-y-auto"
          id="style-1"
        >
          <div className="flex w-full flex-col space-y-4 text-primary-500 lg:space-y-6">
            {sideBar &&
              Object?.keys(sideBar)?.map((k: string) => {
                const i = sideBar[k];

                const group_name = replaceAllString(k, '-', ' ');
                return (
                  <React.Fragment key={k}>
                    <div>
                      <h4 className="mb-1 px-5 text-xs font-bold uppercase tracking-tight text-gray-500 lg:mb-2">
                        {group_name}
                      </h4>
                      {i &&
                        i?.map((o) => {
                          const { name, to, key, groups = [] } = o;
                          const hasGroup = groups?.length > 0;
                          const isActive = module_code === key;
                          return (
                            <React.Fragment key={key}>
                              <Link
                                to={to}
                                className={classNames(
                                  'group z-20 my-1 flex items-center gap-4 py-[2px]',
                                  'ease-out-in transform transition duration-200',
                                  {
                                    'bg-primary-500 text-slate-50': isActive,
                                    'text-slate-50 hover:text-primary-500':
                                      !isActive,
                                  },
                                  {
                                    'pointer-events-none': isActive,
                                  }
                                )}
                                title={name}
                              >
                                <div
                                  className={classNames(
                                    'z-20 h-9 w-1 rounded-r bg-slate-50',
                                    'ease-out-in transform transition duration-200',
                                    {
                                      'opacity-100': isActive && !hasGroup,
                                      'opacity-0': !isActive,
                                    }
                                  )}
                                />
                                <div className="flex items-center space-x-2">
                                  {o?.icon && <o.icon className="h-4 w-4" />}
                                  <span className="text-xs font-semibold lg:text-sm">
                                    {name}
                                  </span>
                                </div>
                                {hasGroup && (
                                  <HiChevronDown
                                    className={classNames(
                                      'ml-auto mr-4 h-5 w-5',
                                      {
                                        'rotate-180 group-focus-within:duration-700':
                                          isActive,
                                        'rotate-0 duration-200': !isActive,
                                      }
                                    )}
                                  />
                                )}
                              </Link>
                              {hasGroup && (
                                <div
                                  className={classNames(
                                    'ease-out-in transform transition',
                                    {
                                      'h-auto opacity-100 delay-100 duration-300':
                                        isActive,
                                      'h-0 overflow-hidden opacity-0 delay-300 duration-200':
                                        !isActive,
                                    }
                                  )}
                                >
                                  {renderSubNav(groups)}
                                  {isActive &&
                                    groups?.length > 0 &&
                                    !sub_module_code && (
                                      <Navigate to={to + groups[0]?.to} />
                                    )}
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </div>
                    <div className="mx-6 border-b border-neutral-200 last:hidden" />
                  </React.Fragment>
                );
              })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
