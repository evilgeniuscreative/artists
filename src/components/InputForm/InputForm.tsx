import * as React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios'
import './inputForm.css';
import {
  Formik,
  FormikHelpers,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import {string, object} from 'yup';


interface MyFormValues {
  name: string;
  url: string;
  city: string;
  image: string;
  description: string;
}


const AddNewSchema = object().shape({
  name: string()
    .min(3, 'Must be at least 3 characters')
    .max(70, 'Must be less than 70 characters')
    .required('Required'),
  description: string()
    .min(3, 'Must be at least 3 characters')
    .max(70, 'Must be less than 70 characters')
    .required('Required'),
  city: string(),
  url: string(),
  image: string()

});

const InputForm: React.FC<{}> = () => {

const navigate = useNavigate();
const {state:{editData}} = useLocation();


const handleSubmit = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>)=>{
  actions.setSubmitting(false);
  const response  = await axios.post('http://localhost:5000/artists',values);
  if(response.data){
    navigate('/table', { state: { src:'http://localhost:5000/artists' } });
  }
}

console.log({editData});
  const initialValues: MyFormValues = { name: editData.name || '' , description: editData.description || '', url: editData.url ||'', city: editData.city || '', image: editData.image || ''};

  return (
    <main id="new_artist">
      <h1>{editData.id ? "Edit ": "New "} Artist</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={AddNewSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className='formItem'>
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" placeholder="Name" />
          <span className="errorMsg"><ErrorMessage name="name" /></span>
          </div>


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

          <button type="submit">{editData.id ?"Update":"Submit" }</button>
        </Form>
      </Formik>

    </main>
  );
};

export {InputForm}