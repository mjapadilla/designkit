import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { HiMenuAlt2, HiOutlineLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { ROOT_PROFILE } from 'context/profile';

import { BreadedNav } from 'layouts/breaded-layout';

import { sideBarOutlet } from 'pages/private';

import { Button, PopUp, SkeletonLoader } from 'ui/components';
import { AvatarImage } from 'ui/media';

import { jsUcFirst } from 'utils';

import { SIDEBAR_PROVIDER } from '../_constants';

function Header() {
  const SIDEBAR_OUTLET = sideBarOutlet();
  const { setShow } = React.useContext(SIDEBAR_PROVIDER);

  const handleOnSideOpenBar = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(true);
  };

  const { data, isLoading } = React.useContext(ROOT_PROFILE);

  return (
    <>
      <div className="bg-white border-b border-gray-200">
        <div className="l flex items-center px-4 py-2 lg:px-5">
          <div className="hidden lg:block">
            <BreadedNav main={SIDEBAR_OUTLET[0]?.to} />
          </div>
          <div className="z-10 block lg:hidden">
            <Button
              size="small"
              label={false}
              color="brand"
              onClick={handleOnSideOpenBar}
              leading={<HiMenuAlt2 className="h-5 w-5 !p-0" />}
            />
          </div>
          <div className="ml-auto flex items-center">
            <div className="h-8 w-44 flex-shrink-0">
              <SkeletonLoader isLoading={isLoading}>
                <PopUp
                  autoClose
                  sizeClassName="w-52"
                  positionClassName="right-0"
                  containerClassName="!w-auto md:!w-full"
                  render={
                    <div className="flex w-full items-center space-x-1">
                      <div className="flex w-full items-center space-x-3">
                        <AvatarImage
                          name={data?.human_full_name || 'NA'}
                          isLoading={isLoading}
                          className="h-7 w-7 rounded-md"
                        />
                        <div className="capitalize">
                          <h4 className="text-xs font-bold leading-4 text-primary-500">
                            {data?.human_full_name || '-----------'}
                          </h4>
                          <p className="-mt-px text-xs font-normal leading-4">
                            {jsUcFirst(data?.human_role_name || '--------')}
                          </p>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-shrink-0 rounded border border-neutral-200 bg-neutral-50">
                        <BiChevronDown className="m-auto h-4 w-4" />
                      </div>
                    </div>
                  }
                >
                  <div className="divide-y py-1" role="none">
                    <Link
                      to="/logout"
                      className="group flex w-full items-center gap-2 px-3 py-1 text-left text-gray-500 hover:bg-gray-100 hover:text-primary-500"
                    >
                      <HiOutlineLogout className="h-5 w-5 text-gray-500 group-hover:text-primary-500" />
                      <span>Sign out</span>
                    </Link>
                  </div>
                </PopUp>
              </SkeletonLoader>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
