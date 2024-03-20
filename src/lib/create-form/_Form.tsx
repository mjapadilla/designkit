import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

interface IProps<T> {
  defaultValues: T;
  children: React.ReactNode;
  zodSchema: z.ZodSchema;
  onSubmit: (res: T) => void;
}

type TLayoutProps = React.ComponentProps<typeof Form>;
type TSchema = z.infer<TLayoutProps['zodSchema']>;

/**
 * # Form example usage.
 *
 * @example
 * ```ts
 * import Form from 'lib/create-form';
 * import { FormInput } from 'ui/forms';
 *
 * const ZodSchema = z.object({
 *    name: z.string().min(1, {
 *      message: 'Name is required',
 *    }),
 *  });
 *
 * const INIT_FORM = {
 *    name: '',
 * };
 *
 * function App() {
 *    return (
 *      <Form
 *        defaultValues={INIT_FORM}
 *        zodSchema={ZodSchema}
 *        onSubmit={(v) => {
 *          console.log(v, ' here');
 *        }}
 *      >
 *       <FormInput
 *         register={register('name')}
 *         label="Name"
 *         required
 *       />
 *       <Button
 *         label="Submit"
 *         type="submit"
 *         color="brand"
 *         className="ml-auto w-32"
 *       />
 *     </Form>
 *   );
 * }
 * ```
 */

function Form<T>({ children, zodSchema, defaultValues, onSubmit }: IProps<T>) {
  const prevState = React.useRef(JSON.stringify(defaultValues));

  const methods = useForm<TSchema>({
    defaultValues: defaultValues || {},
    resolver: zodResolver(zodSchema),
  });

  const { reset } = methods;

  React.useLayoutEffect(() => {
    const currentState = JSON.stringify(defaultValues);
    if (prevState?.current !== currentState) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((value) => onSubmit(value))}
        className="h-full"
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
