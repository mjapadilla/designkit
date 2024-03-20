import React from 'react';

import { useMutation } from 'services';

import { TTransformedObject } from 'utils';

import * as actions from './_actions';
import {
  TBusinessCategoryType,
  TDashboardTerminalType,
  TOperatingCityType,
  TOperatingHoursType,
  TOperatorRoleType,
  TOperatorType,
  TParams,
  TRoleType,
  TRouteType,
  TTerminalType,
  TUserLevelType,
} from './_types';

type TActionType =
  | 'TIME_TYPE'
  | 'ROLE_TYPE'
  | 'ROUTE_TYPE'
  | 'TERMINAL_TYPE'
  | 'OPERATOR_TYPE'
  | 'USER_LEVEL_TYPE'
  | 'OPERATOR_ROLE_TYPE'
  | 'DASHBOARD_TERMINAL_TYPE'
  | 'BUSINESS_CATEGORY_TYPE'
  | 'OPERATING_CITY_TYPE';

type TReturnTransformObject<T extends TActionType> = {
  ROLE_TYPE: TRoleType;
  ROUTE_TYPE: TRouteType;
  TERMINAL_TYPE: TTerminalType;
  OPERATOR_TYPE: TOperatorType;
  TIME_TYPE: TOperatingHoursType;
  USER_LEVEL_TYPE: TUserLevelType;
  OPERATOR_ROLE_TYPE: TOperatorRoleType;
  DASHBOARD_TERMINAL_TYPE: TDashboardTerminalType;
  BUSINESS_CATEGORY_TYPE: TBusinessCategoryType;
  OPERATING_CITY_TYPE: TOperatingCityType;
}[T];

type TActionFunction<T extends TActionType> = (
  params?: TParams
) => Promise<TTransformedObject<TReturnTransformObject<T>>[]>;

const disaptchActionType: Record<TActionType, TActionFunction<TActionType>> = {
  ROLE_TYPE: actions.getRoleType,
  ROUTE_TYPE: actions.getRouteType,
  TERMINAL_TYPE: actions.getTerminalType,
  OPERATOR_TYPE: actions.getOperatorType,
  TIME_TYPE: actions.getOperatingHoursType,
  USER_LEVEL_TYPE: actions.getUserLevelType,
  OPERATOR_ROLE_TYPE: actions.getOperatorRoleType,
  DASHBOARD_TERMINAL_TYPE: actions.getDashboardTerminalType,
  BUSINESS_CATEGORY_TYPE: actions.getBusinessCategoryType,
  OPERATING_CITY_TYPE: actions.getOperatingCityType,
};

type RequiredOperatorUuid<T extends TActionType> = T extends
  | 'ROUTE_TYPE'
  | 'TERMINAL_TYPE'
  ? { operator_uuid: string }
  : object;

const useRequestOptions = <T extends TActionType>(type: T) => {
  const { isLoading, mutate, data } = useMutation(disaptchActionType[type]);

  const request = React.useCallback(
    (
      params?: TParams & RequiredOperatorUuid<T>,
      cb?: (res: TTransformedObject<TReturnTransformObject<T>>[]) => void
    ) => {
      mutate(params, {
        onSuccess: (res) => {
          if (cb) {
            cb(res as TTransformedObject<TReturnTransformObject<T>>[]);
          }
        },
      });
    },
    [mutate]
  );

  return { isLoading, request, data };
};

export default useRequestOptions;
