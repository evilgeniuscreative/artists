import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormItem } from '..';
import axios, { AxiosResponse } from 'axios';
import GenerateRandomId from '../../Utils/GenerateRandomId';
import './albumForm.css';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import { PageTitle } from '../PageTitle';

type Album = {
  toEdit: boolean;
  artistId: string | null;
  id: string;
  name: string;
  description: string;
  len: number;
  coverImg: string;
  tracks: string;
};

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
  const [editData, setEditData] = useState<Album>({} as Album); // Initialize as empty object

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const toEdit = queryParameters.get('edit') === 'true';
    const artistId = queryParameters.get('artistId');

    if (toEdit) {
      const id = queryParameters.get('id');
      fetchData(id, artistId);
    } else {
      const newArtistId = GenerateRandomId(); // Generate new artistId
      setEditData({
        toEdit: false,
        artistId: newArtistId, // Assign the generated artistId
        id: GenerateRandomId(),
        name: '',
        description: '',
        len: 0,
        coverImg: '',
        tracks: '',
      });
    }
  }, []);

  const fetchData = async (id: string | null, artistId: string | null) => {
    if (!id || !artistId) return;

    try {
      const response: AxiosResponse<any, any> = await axios.get(`http://localhost:5000/artists/${artistId}`);
      const albums: Album[] = Object.values(response.data.albums);
      const album: Album | undefined = albums.find((album: any) => album.id === id);

      if (album) {
        setEditData({
          ...album,
          toEdit: true,
          artistId: artistId, // Ensure artistId is assigned from URL parameter
        });
      }
    } catch (error) {
      console.log('Error fetching data in AlbumForm:', error);
    }
  };

  const handleSubmit = async (values: Album) => {
    try {
      let response: AxiosResponse<any, any>;

      if (values.toEdit) {
        response = await axios.patch(`http://localhost:5000/artists/${values.id}`, values);
      } else {
        response = await axios.post('http://localhost:5000/artists', values);
      }

      if (response.data) {
        navigate('/table', { state: { src: 'http://localhost:5000/artists' } });
      }
    } catch (error) {
      console.log('Error while submitting form:', error);
    }
  };

  const formNames = [
    { name: 'artistId', placeholder: 'Artist ID' },
    { name: 'id', placeholder: 'Album ID' },
    { name: 'name', placeholder: 'Album Name' },
    { name: 'len', placeholder: 'Album Length' },
    { name: 'tracks', placeholder: 'Tracks (comma-separated)' },
    { name: 'coverImg', placeholder: 'Cover Image' },
    { name: 'description', placeholder: 'Album Description', as: 'textarea' },
  ];

  return (
    <main id='new_item'>
      <h1>{editData?.toEdit ? 'Edit' : 'New'} Album</h1>
      <PageTitle title='Album Details' />
      <Formik initialValues={editData} validationSchema={AddNewSchema} onSubmit={handleSubmit} enableReinitialize>
        <Form>
          {formNames.map((formItem, index) => (
            <Fragment key={index}>
              <FormItem name={formItem.name} as={formItem.as} placeholder={formItem.placeholder} type='text' />
            </Fragment>
          ))}
          <button type='submit'>{editData?.toEdit ? 'Update' : 'Submit'}</button>
        </Form>
      </Formik>
    </main>
  );
};

export { AlbumForm };
