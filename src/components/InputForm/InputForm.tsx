import * as React from 'react';
import {useEffect, useState} from 'react';
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
  ErrorMessage
} from 'formik';

import * as Yup from 'yup';
import { TableView } from '../TableView';

interface MyFormValues {
  value: string;
  description: string;
}

interface DataProps {
    data: {
        id:number
        value:string
        description:string
    }[],
}

const AddNewSchema = Yup.object().shape({
  value: Yup.string()
    .min(4, 'Must be at least 4 characters')
    .max(70, 'Must be less than 70 characters')
    .required('Required'),
  description: Yup.string()
    .min(4, 'Must be at least 4 characters')
    .max(70, 'Must be less than 70 characters')
    .required('Required')
});

const InputForm: React.FC<{}> = () => {

const [currData, setCurrData] = useState();

const handleSubmit = async (values: MyFormValues) =>{

}

  useEffect(()=>{
  fetch('http://localhost:5000/artists')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    setCurrData(data);
  })
},[]);

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
          handleSubmit(values);
          
        }}
      >
        <Form>
          <label htmlFor="value">Value</label>
          <Field id="value" name="value" placeholder="Value" />
          <ErrorMessage name="value" />

          <label htmlFor="description">Description</label>
          <Field id="description" name="description" placeholder="Description"/>  
          <ErrorMessage name="description" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <TableView data={currData}/>
    </main>
  );
};

export {InputForm}