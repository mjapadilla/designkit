import { useFormContext, UseFormReturn } from 'react-hook-form';
import { z, ZodSchema } from 'zod';

/**
 * # Required Props
 * @param _schema - You need to pass the zod schema you created
 *  #### Example usage
 * ```ts
 * const { register } = useFormHelper(ZodSchema)
 * ```
 */

export const useFormHelper = <T extends ZodSchema>(_schema: T) => {
  const formContext = useFormContext<z.infer<typeof _schema>>();
  if (!formContext) {
    // eslint-disable-next-line
    console.error(
      "useFormHelper is null. Make sure you're using useFormHelper within the Form component."
    );
    return {} as UseFormReturn<z.infer<T>>;
  }
  return formContext;
};
