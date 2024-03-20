import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

import { queryClient } from './_config';

type Props = {
  children?: ReactNode;
  withDevTool?: boolean;
};

function QueryProvider({ children, withDevTool }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {withDevTool && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </QueryClientProvider>
  );
}

QueryProvider.defaultProps = {
  withDevTool: false,
  children: 'Children',
};

export default QueryProvider;
