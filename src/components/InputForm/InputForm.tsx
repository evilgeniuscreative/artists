import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios'
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
  name: string;
  url: string;
  city: string;
  image: string;
  description: string;
}


const AddNewSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(70, 'Must be less than 70 characters')
    .required('Required'),
  description: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(70, 'Must be less than 70 characters')
    .required('Required'),
  city: Yup.string(),
  url: Yup.string(),
  image: Yup.string()

});

const InputForm: React.FC<{}> = () => {

const handleSubmit = async (values: MyFormValues) =>{
  axios.post('http://localhost:5000/artists',values)
    .then(function(response){
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
  });
}

  const initialValues: MyFormValues = { name: '' , description: '', url: '', city: '', image: ''};

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
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" placeholder="Name" />
          <ErrorMessage name="name" />


          <label htmlFor="city">City</label>
          <Field id="city" name="city" placeholder="City"/>  
          <ErrorMessage name="city" />

          <label htmlFor="url">URL</label>
          <Field id="url" name="url" placeholder="URL"/>  
          <ErrorMessage name="url" />


          <label htmlFor="image">Image</label>
          <Field id="image" name="image" placeholder="Image"/>  
          <ErrorMessage name="image" />


          <label htmlFor="description">Description</label>
          <Field id="description" as="textarea" rows="8" name="description" placeholder="Description"/>  
          <ErrorMessage name="description" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>

    </main>
  );
};

export {InputForm}