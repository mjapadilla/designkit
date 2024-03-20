import useGetLevel from 'hooks/useGetLevel';

import { WipContainer } from 'ui/components';

import Admin from './admin';

function Layout() {
  const level = useGetLevel();
  if (level === 'ADMIN') {
    return <Admin />;
  }

  if (level === 'APPROVER') {
    return <WipContainer label="(APPROVER)" />;
  }

  return <WipContainer label="(MAKER)" />;
}

export default Layout;
