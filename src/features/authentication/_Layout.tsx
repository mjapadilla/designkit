import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Form from 'lib/create-form';

import { ROOT_SESSION } from 'context/session';

import { Button, ErrorNotice } from 'ui/components';

import { ZPayload } from './_types';
import LoginForm from './forms/LoginForm';
import useLogin from './hooks/useLogin';

const INIT_FORM = {
  email: 'admin@email.com',
  password: 'autopay@1234',
};

function Layout() {
  const navigate = useNavigate();
  const { setIfAuthenticated } = React.useContext(ROOT_SESSION);

  const { mutate, isLoading } = useLogin({
    onSuccess: () => {
      setIfAuthenticated(true);
      navigate('/');
    },
  });

  return (
    <Form
      zodSchema={ZPayload}
      defaultValues={INIT_FORM}
      onSubmit={(v) => mutate(v)}
    >
      <ErrorNotice id="login" className="mb-1 py-2" />
      <LoginForm />
      <div className="text-right">
        <Link to="/" className="text-xs font-normal leading-3 text-primary-500">
          Forgot Password?
        </Link>
      </div>
      <div className="mt-8 flex flex-col space-y-2">
        <Button
          withLoader
          label="Submit"
          type="submit"
          color="brand"
          isLoading={isLoading}
        />
      </div>
    </Form>
  );
}

export default Layout;
