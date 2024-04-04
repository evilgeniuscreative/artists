import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FormItem } from '..';
import axios, { AxiosResponse } from 'axios';
import './inputForm.css';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import { Navigation } from '../Navigation';
import { PageTitle } from '../PageTitle';

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
  description: string().min(3, 'Must be at least 3 characters').max(1000, 'Must be less than 1000 characters').required('Required'),
  city: string(),
  url: string(),
  image: string(),
});

const InputForm: React.FC<{}> = () => {
  const [userData, setUserData] = useState<MyFormValues>({
    id: '',
    name: '',
    url: '',
    city: '',
    image: '',
    description: '',
  });

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function fetchExistingUser() {
      try {
        const res = await axios.get(`http://localhost:5000/artists/${id}`);
        setUserData(res.data);
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    }
    if (id) {
      fetchExistingUser();
    }
  }, []);

  const handleSubmit = async (values: MyFormValues) => {
    let response: AxiosResponse<any, any>;
    if (id) {
      response = await axios.patch(`http://localhost:5000/artists/${id}`, values);
    } else {
      response = await axios.post('http://localhost:5000/artists', values);
    }
    if (response.data) navigate(`/artist-detail/${id}`, { state: { src: 'http://localhost:5000/artists' } });
  };

  const initialValues: MyFormValues = {
    id: userData.id || '',
    name: userData.name || '',
    description: userData.description || '',
    url: userData.url || '',
    city: userData.city || '',
    image: userData.image || '',
  };

  console.log('initialvalues', initialValues);
  const formNames = [
    { name: 'id', placeholder: 'ID' },
    { name: 'name', placeholder: 'Name' },
    { name: 'city', placeholder: 'City' },
    { name: 'url', placeholder: 'URL' },
    { name: 'image', placeholder: 'Image' },
    { name: 'description', placeholder: 'Description', as: 'textarea' },
  ];
  console.log({ userData });
  return (
    <>
      <PageTitle title={id ? 'Edit Artist' : 'Add New Artist'} />
      <Navigation />
      <main id='new_item'>
        <h1>{id ? 'Edit ' : 'New '} Artist</h1>
        <div className='rainbow-line'></div>
        <Formik initialValues={initialValues} validationSchema={AddNewSchema} onSubmit={handleSubmit} enableReinitialize>
          <Form>
            {formNames.map((formItem) => {
              return (
                <Fragment key={formItem.name}>
                  <FormItem name={formItem.name} as={formItem.as} placeholder={formItem.placeholder} type={formItem.name === 'id' ? 'hidden' : 'text'} />
                </Fragment>
              );
            })}
            <button type='submit'>{userData?.id ? 'Update' : 'Submit'}</button>
          </Form>
        </Formik>
        {userData?.id ? (
          <p className='rightNote'>
            <Link className='button' to={`/albums/${userData.id}`}>
              Artist albums
            </Link>
          </p>
        ) : null}
      </main>
    </>
  );
};

export { InputForm };
