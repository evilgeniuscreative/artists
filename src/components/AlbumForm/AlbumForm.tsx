import { Fragment, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormItem } from '..';
import axios, { AxiosResponse } from 'axios';
import GenerateRandomId from '../../Utils/GenerateRandomId';
import './albumForm.css';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';

type Album = {
  albumId: string;
  albumName: string;
  albumDescription: string;
  albumLength: string;
  albumCoverImg: string;
  tracks: string;
};

interface MyFormValues {
  id: string;
  albums: Album;
}

const AddNewSchema = object().shape({
  id: string(),
  albumId: string(),
  albumName: string().min(3, 'Must be at least 3 characters').max(70, 'Must be less than 70 characters').required('Required'),
  albumDescription: string().min(25, 'Must be at least 25 characters').max(500, 'Must be less than 500 characters').required('Required'),
  albumLength: string(),
  samplesUrl: string(),
  albumCoverImg: string(),
  tracks: string().required('Required').min(3, 'Must be at least 3 characters'),
});

const AlbumForm: React.FC<{}> = () => {
  const navigate = useNavigate();
  console.log('useLocation: ', useLocation());

  const {
    state: { editData, pageTitle },
  } = useLocation();

  const queryParameters = new URLSearchParams(window.location.search);
  const isNew = queryParameters.get('new');
  const id = queryParameters.get('id');

  // const [editData, setEditData] = useState({
  //   id: id,
  //   albumId: '',
  //   albumName: '',
  //   albumDescription: '',
  //   albumLength: '',
  //   albumCoverImg: '',
  //   tracks: '',
  // });

  const handleSubmit = async (values: MyFormValues) => {
    let response: AxiosResponse<any, any>;
    if (id) {
      response = await axios.patch(`http://localhost:5000/artists/${id}`, values);
    } else {
      response = await axios.post('http://localhost:5000/artists', values);
    }
    if (response.data) {
      navigate('/table', { state: { src: 'http://localhost:5000/artists' } });
    }
  };

  console.log('editData: ', editData);
  const initialValues: MyFormValues = {
    id: editData?.id || '',
    albums: {
      albumId: editData?.albumId || GenerateRandomId(),
      albumName: editData?.albumName || '',
      albumDescription: editData?.albumDescription || '',
      albumLength: editData?.albumLength || '',
      albumCoverImg: editData?.albumCoverImg || '',
      tracks: editData?.tracks || '',
    },
  };

  const formNames = [
    { name: 'id', id: '', placeholder: '' },
    { name: 'albumId', albumId: '', placeholder: 'hidden' },
    { name: 'albumName', placeholder: 'Album Name' },
    { name: 'albumLength', placeholder: 'Album Length' },
    { name: 'tracks', placeholder: 'Tracks (comma-separated)' },
    { name: 'albumCoverImg', placeholder: 'Cover Image' },
    { name: 'albumDescription', placeholder: 'Album Description', as: 'textarea' },
  ];

  return (
    <main id='new_item'>
      <h1>
        {editData?.id ? 'Edit ' : 'New '} {pageTitle}
      </h1>

      <Formik initialValues={initialValues} validationSchema={AddNewSchema} onSubmit={handleSubmit}>
        <Form>
          {formNames.map((formItem) => {
            return (
              <Fragment key={formItem.albumId}>
                <FormItem name={formItem.name} as={formItem.as} placeholder={formItem.placeholder} type={formItem.name === 'id' || formItem.name === 'albumId' ? 'hidden' : 'text'} />
              </Fragment>
            );
          })}
          <button type='submit'>{editData?.id ? 'Update' : 'Submit'}</button>
        </Form>
      </Formik>
    </main>
  );
};

export { AlbumForm };
