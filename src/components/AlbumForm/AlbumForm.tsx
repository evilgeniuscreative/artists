import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormItem } from '..';
import axios, { AxiosResponse } from 'axios';
import GenerateRandomId from '../../Utils/GenerateRandomId';
import './albumForm.css';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import { PageTitle } from '../PageTitle';

type Album = {
  toEdit: boolean;
  artistId: string;
  id: string;
  name: string;
  description: string;
  len: number;
  coverImg: string;
  tracks: string;
};

interface MyFormValues {
  id: string;
  albums: Album;
}

interface PageTitle {
  pageTitle: string;
}
const pageTitle = 'Album Details';

const AddNewSchema = object().shape({
  artistId: string(),
  id: string(),
  name: string().min(3, 'Must be at least 3 characters').max(70, 'Must be less than 70 characters').required('Required'),
  description: string().min(25, 'Must be at least 25 characters').max(500, 'Must be less than 500 characters').required('Required'),
  len: string(),
  samplesUrl: string(),
  coverImg: string(),
  tracks: string().required('Required').min(3, 'Must be at least 3 characters'),
});

const AlbumForm: React.FC<{}> = () => {
  const navigate = useNavigate();
  console.log('useLocation: ', useLocation());

  const queryParameters = new URLSearchParams(window.location.search);
  const isNew = queryParameters.get('new');
  const toEdit = Boolean(queryParameters.get('edit'));
  const id = queryParameters.get('id');
  const artist_id = queryParameters.get('artistId');
  
  console.log('artist_id: ', artist_id, typeof artist_id);
  const [albumData, setAlbumData] = useState<Album[]>([]);

  const [artistId, setArtistId] = useState<string>;

  setArtistId([artist_id]);

  const [editData, setEditData] = useState({
    toEdit: toEdit,
    artistId: artistId,
    id: id,
    name: '',
    description: '',
    len: 0,
    coverImg: '',
    tracks: '',
  });

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

  useEffect(() => {
    console.log('useEffect, toEdit: ', toEdit);
    if (toEdit) {
      let response: AxiosResponse<any, any>;
      const fetchData = async () => {
        try {
          response = await axios.get(`http://localhost:5000/artists/${artistId}`);
          const albums = Object.values(response.data.albums);
          const album = albums.find((album: any) => album.id === id);

          console.log('album: ', album);
          // setEditData(album);
        } catch (error) {
          console.log('Error fetch data in AlbumForm');
        }
      };

      fetchData();
    }
  }, [toEdit]);

  const initialValues: MyFormValues = {
    id: id || '',
    albums: {
      toEdit: toEdit || false,
      artistId: artistId || '',
      id: id || GenerateRandomId(),
      name: '',
      description: '',
      len: 0,
      coverImg: '',
      tracks: '',
    },
  };

  console.log('initialValues: ', initialValues);
  console.log('stuff', artistId, id, toEdit);

  const formNames = [
    { name: 'artistId', artistId: '', placeholder: 'artistId' },
    { name: 'id', id: '', placeholder: 'albumId' },
    { name: 'name', placeholder: 'Album Name' },
    { name: 'len', placeholder: 'Album Length' },
    { name: 'tracks', placeholder: 'Tracks (comma-separated)' },
    { name: 'coverImg', placeholder: 'Cover Image' },
    { name: 'description', placeholder: 'Album Description', as: 'textarea' },
  ];

  return (
    <main id='new_item'>
      <h1>
        {editData?.toEdit ? 'Edit ' : 'New '} {pageTitle}
      </h1>
      <PageTitle title='Album Details' />
      <Formik initialValues={initialValues} validationSchema={AddNewSchema} onSubmit={handleSubmit} enableReinitialize>
        <Form>
          {formNames.map((formItem) => {
            return (
              <Fragment key={formItem.id}>
                <FormItem name={formItem.name} as={formItem.as} placeholder={formItem.placeholder} type='text' />
              </Fragment>
            );
          })}
          <button type='submit'>{editData?.toEdit ? 'Update' : 'Submit'}</button>
        </Form>
      </Formik>
    </main>
  );
};

export { AlbumForm };
