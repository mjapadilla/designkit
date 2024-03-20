import Cookies from 'js-cookie';

import { TOKEN_KEY } from 'services';

export const useAuth = () => {
  const token = Cookies.get(TOKEN_KEY);

  const isAuthenticated = !!token;
  return [typeof isAuthenticated === 'boolean', isAuthenticated];
};
