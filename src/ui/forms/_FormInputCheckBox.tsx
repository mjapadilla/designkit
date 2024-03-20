import classNames from 'classnames';
import { FieldValues } from 'react-hook-form';

type TCommonProps = {
  className?: string;
  label?: string;
  containerClassName?: string;
};

type TProps<T> =
  | ({
      register?: false;
      name: string;
      checked: boolean;
      onChange: React.Dispatch<React.SetStateAction<T>>;
    } & TCommonProps)
  | ({
      register: FieldValues;
      name?: string;
      checked?: boolean;
      onChange?: false;
    } & TCommonProps);

function FormInputCheckBox<T>({
  label,
  register,
  className,
  containerClassName,
}: TProps<T>) {
  return (
    <div className={classNames('flex w-full items-center', containerClassName)}>
      <input
        type="checkbox"
        className={classNames('form-checkbox', className)}
        {...(register && { ...register, id: register?.name })}
      />
      {label && <span className="form-label m-0 ml-2 text-sm">{label}</span>}
    </div>
  );
}

export default FormInputCheckBox;
