import Cookies from 'js-cookie';

import { TDirectory } from 'types';

import { checkHasPermission } from 'utils';

import { ADMIN_ROUTE_LIST } from './_directory';

const filterRoutes = (rt: TDirectory[]) => {
  const modules = rt?.map((x) => {
    const { groups = [] } = x;
    if (groups?.length > 0) {
      return {
        ...x,
        groups: x?.groups?.filter((y) =>
          checkHasPermission(y?.module_permissions)
        ),
      };
    }

    return x;
  });

  const o = modules?.filter(
    (x) =>
      checkHasPermission(x?.module_permissions) || (x?.groups ?? [])?.length > 0
  );
  return o;
};

const filterByLevel = () => {
  const level = Cookies.get('_level') || 'NONE';
  const dispatchRoute = {
    ADMIN: ADMIN_ROUTE_LIST,
    NONE: [],
  };
  return dispatchRoute[level as keyof typeof dispatchRoute];
};

const groupRoute = (list: TDirectory[]) =>
  list?.reduce((r, a) => {
    const $r = r;
    $r[a?.group_by ?? ''] = r[a?.group_by ?? ''] || [];
    $r[a?.group_by ?? ''].push(a);
    return $r;
  }, Object.create(null));

export const sideBarMenu = () => {
  const x = filterRoutes(filterByLevel());
  const SIDEBAR_MENU = groupRoute(x) as {
    [key: string]: TDirectory[];
  };
  return SIDEBAR_MENU;
};

export const sideBarOutlet = () => {
  const SIDEBAR_OUTLET = filterRoutes(filterByLevel());
  return SIDEBAR_OUTLET;
};
