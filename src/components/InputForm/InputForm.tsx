import { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormItem } from '..';
import axios, { AxiosResponse } from 'axios';
import './inputForm.css';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import { Navigation } from '../Navigation';

interface MyFormValues {
  id: string;
  name: string;
  url: string;
  city: string;
  image: string;
  description: string;
}

const AddNewSchema = object().shape({
  id: string(),
  name: string().min(3, 'Must be at least 3 characters').max(70, 'Must be less than 70 characters').required('Required'),
  description: string().min(3, 'Must be at least 3 characters').max(300, 'Must be less than 300 characters').required('Required'),
  city: string(),
  url: string(),
  image: string(),
});

const InputForm: React.FC<{}> = () => {
  const navigate = useNavigate();
  const {
    state: { editData, pageTitle },
  } = useLocation();
  console.log('useLocation: ', useLocation());

  const handleSubmit = async (values: MyFormValues) => {
    let response: AxiosResponse<any, any>;
    if (editData?.id) {
      response = await axios.patch(`http://localhost:5000/artists/${editData.id}`, values);
    } else {
      response = await axios.post('http://localhost:5000/artists', values);
    }
    if (response.data) {
      navigate('/table', { state: { src: 'http://localhost:5000/artists' } });
    }
  };

  const initialValues: MyFormValues = {
    id: editData?.id || '',
    name: editData?.name || '',
    description: editData?.description || '',
    url: editData?.url || '',
    city: editData?.city || '',
    image: editData?.image || '',
  };

  const formNames = [
    { name: 'id', placeholder: 'ID' },
    { name: 'name', placeholder: 'Name' },
    { name: 'city', placeholder: 'City' },
    { name: 'url', placeholder: 'URL' },
    { name: 'image', placeholder: 'Image' },
    { name: 'description', placeholder: 'Description', as: 'textarea' },
  ];

  console.log('editData: ', editData);
  return (
    <>
      <Navigation />
      <main id='new_item'>
        <h1>
          {editData?.id ? 'Edit ' : 'New '} {pageTitle}
        </h1>

        <Formik initialValues={initialValues} validationSchema={AddNewSchema} onSubmit={handleSubmit}>
          <Form>
            {formNames.map((formItem) => {
              return (
                <Fragment key={formItem.name}>
                  <FormItem name={formItem.name} as={formItem.as} placeholder={formItem.placeholder} />
                </Fragment>
              );
            })}
            <button type='submit'>{editData?.id ? 'Update' : 'Submit'}</button>
            {editData?.id ? (
              <p className='rightNote'>
                <a href={`/album/?new=true&id=${editData.id}`}>Add artist albums</a>
              </p>
            ) : null}
          </Form>
        </Formik>
      </main>
    </>
  );
};

export { InputForm };
