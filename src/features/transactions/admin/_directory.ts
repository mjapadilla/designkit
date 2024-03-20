import { TDirectory } from 'types';

import AllTransactions from './pages/AllTransactions';
import Daily from './pages/Daily';
import Monthly from './pages/Monthly';
import Yearly from './pages/Yearly';

export const ROUTES: TDirectory[] = [
  {
    key: 'all-transactions',
    to: '/all-transactions',
    path: '/all-transactions',
    component: AllTransactions,
    name: 'All Transactions',
    module_permissions: ['static-r'],
  },
  {
    key: 'daily',
    to: '/daily',
    path: '/daily',
    component: Daily,
    name: 'Daily',
    module_permissions: ['static-r'],
  },
  {
    key: 'monthly',
    to: '/monthly',
    path: '/monthly',
    component: Monthly,
    name: 'Monthly',
    module_permissions: ['static-r'],
  },
  {
    key: 'yearly',
    to: '/yearly',
    path: '/yearly',
    component: Yearly,
    name: 'Yearly',
    module_permissions: ['static-r'],
  },
];
