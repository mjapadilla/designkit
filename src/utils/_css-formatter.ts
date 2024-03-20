import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const mergeClasses = (...args: Array<string | undefined>) =>
  twMerge(classNames(args));
