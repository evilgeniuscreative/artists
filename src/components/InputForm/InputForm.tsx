import * as React from 'react';
import './inputForm.css';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';

interface MyFormValues {
  value: string;
  description: string;
}

const InputForm: React.FC<{}> = () => {
  const initialValues: MyFormValues = { value: '' , description: ''};
  return (
    <main id="new_artist">
      <h1>Add New Artist</h1>
      <Formik
        initialValues={initialValues}
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
          <Field id="description" name="description" placeholder="Description" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </main>
  );
};

export {InputForm}