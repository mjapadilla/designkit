import { TPermissions } from 'types';

import { storage } from './_storage';

export const checkHasPermission = (value: TPermissions[]) => {
  const permissions: TPermissions[] = storage.get('permissions', []);
  const x = permissions?.filter((i) => value?.indexOf(i) > -1)?.length > 0;
  return x;
};

export const checkHasDomPermission = (
  dom: React.ReactNode,
  permissionReq: TPermissions
) => {
  const permissions: TPermissions[] = storage.get('permissions', []);
  if (permissions?.filter((i) => i === permissionReq)?.length > 0) {
    return dom;
  }
  return null;
};
