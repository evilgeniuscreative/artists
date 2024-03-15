import * as React from 'react';
import './inputForm.css';
import {
  Formik,
  useFormik,
  useField,
  FormikProvider,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';

import * as Yup from 'yup';

interface MyFormValues {
  value: string;
  description: string;
}

const AddNewSchema = Yup.object().shape({
  value: Yup.string()
  .min(4, 'Must be at least 4 characters')
  .max(70, 'Must be less than 70 characters')
    .required('Required'),
  description: Yup.string()
    .required('Required')
});

const InputForm: React.FC<{}> = () => {
  const initialValues: MyFormValues = { value: '' , description: ''};

  return (
    <main id="new_artist">
      <h1>Add New Artist</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={AddNewSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="value">Value</label>
          <Field id="value" name="value" placeholder="Value" />

          <label htmlFor="description">Description</label>
          <Field id="description" name="description" placeholder="Description"/>  
                 
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </main>
  );
};

export {InputForm}