import Cookies from 'js-cookie';

import { toast } from 'ui/toast';

type TReturnType = 'ADMIN' | 'APPROVER' | 'MAKE';

const useGetLevel = (): TReturnType => {
  const level = Cookies.get('_level') as TReturnType;
  if (!level) {
    toast.warning('Level is not available');
    return 'ADMIN';
  }

  return level;
};

export default useGetLevel;
