import { useFormHelper } from 'lib/create-form';

import { FormInput } from 'ui/forms';

import { ZPayload } from '../_types';

function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useFormHelper(ZPayload);
  return (
    <div className="grid grid-cols-1 gap-4">
      <FormInput
        label="Email"
        placeholder="Enter email"
        register={register('email')}
        error={errors?.email?.message}
      />
      <FormInput
        withShowPassword
        type="password"
        label="Password"
        placeholder="Enter password"
        register={register('password')}
        error={errors?.password?.message}
      />
    </div>
  );
}

export default LoginForm;
