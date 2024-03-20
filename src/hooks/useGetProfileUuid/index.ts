import { useParams } from 'react-router-dom';

import { storage } from 'utils';

const useGetProfileUuid = () => {
  const { profile_uuid = '' } = useParams();
  const x = profile_uuid || storage.get('organization_uuid');
  return x;
};

export default useGetProfileUuid;
