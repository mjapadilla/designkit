import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './_Button';
import EmptyState from './_EmptyState';

function NoPermission() {
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/logout');
  };

  return (
    <div className="h-full w-full">
      <EmptyState
        label="No attach permission."
        note="Contact your administrator."
        actionButton={
          <Button
            label="Logout"
            className="md primary btn px-12"
            onClick={onClick}
          />
        }
      />
    </div>
  );
}

export default NoPermission;
