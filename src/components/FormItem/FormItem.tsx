import { Field, ErrorMessage } from 'formik';

interface FormStructure {
  name: string;
  as?: string;
  placeholder: string;
  type?: string;
}

const FormItem = ({ name, as = undefined, placeholder, type = 'text' }: FormStructure) => {
  return (
    <div>
      <label htmlFor={name}>{placeholder}</label>
      <Field as={as} id={name} name={name} placeholder={placeholder} />
      <span className='errorMsg'>
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export { FormItem };
