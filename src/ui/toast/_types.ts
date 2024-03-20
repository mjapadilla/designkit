import { ReactNode } from 'react';

export type MAP_TYPE = 'success' | 'warning' | 'info' | 'error';

type TOrigin =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface IOptions {
  timeout?: number;
  title?: string | boolean;
  type: MAP_TYPE;
  position: TOrigin;
}

export type TRenderType = {
  bg: string;
  color: string;
  icon: ReactNode;
  title: string;
  loader: string;
};
