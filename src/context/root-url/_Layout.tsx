import { ROOT_URL } from './_constants';

function Layout({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <ROOT_URL.Provider value={value}>{children}</ROOT_URL.Provider>;
}

export default Layout;
