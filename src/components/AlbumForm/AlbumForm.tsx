import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormItem } from '..';
import axios, { AxiosResponse } from 'axios';
import GenerateRandomId from '../../Utils/GenerateRandomId';
import './albumForm.css';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import { Header } from '../Header';

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
  const [editData, setEditData] = useState<Album | null>(null);
  const [whichAlbum, setWhichAlbum] = useState<number>(0);

  // const queryParameters = new URLSearchParams(window.location.search);
  // const toEdit = queryParameters.get('edit') === 'true';
  // const artistId = queryParameters.get('artistId');
  // const id = queryParameters.get('id');

  // this is throwing type errors with or without the optional renaming or attempted typing
  const { artist, albid, edit } = useParams();
  console.log({ artist, albid, edit });
  const artistId = artist;
  const id: string | undefined = albid;
  const toEdit = edit === 'edit';

  useEffect(() => {
    // if (toEdit) {
    //   fetchData(id, artistId);
    // } else {
    //   console.log('new album');
    //   setEditData({
    //     toEdit: false,
    //     artistId: artistId,
    //     id: GenerateRandomId(),
    //     name: '',
    //     description: '',
    //     len: 0,
    //     coverImg: '',
    //     tracks: '',
    //   });
    // }
  }, []);

  const fetchData = async (id: string | null, artistId: string | null) => {
    if (!id || !artistId) return;

    try {
      const response: AxiosResponse<any, any> = await axios.get(`http://localhost:5000/artists/${artistId}`);
      const albums: Album[] = Object.values(response.data.albums);

      const album: Album | undefined = albums.find((album: any) => album.id === id);

      for (const el of albums) {
        if (el.id === id) {
          setWhichAlbum(albums.indexOf(el));
        }
      }

      if (album) {
        setEditData({
          ...album,
          toEdit: true,
          artistId: artistId, // Ensure artistId is assigned from URL parameter
        });
      } else {
        setEditData({
          artistId: artistId,
          toEdit: false,
          id: GenerateRandomId(),
          name: '',
          description: '',
          len: 0,
          coverImg: '',
          tracks: '',
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
        const albumValues = { albums: values };

        console.log('patched', `http://localhost:5000/artists/${values.artistId}`, albumValues);
        response = await axios.patch(`http://localhost:5000/artists/${values.artistId}`, albumValues);
      } else {
        response = await axios.post('http://localhost:5000/artists', values);
      }

      if (response.data) {
        //  navigate('/table', { state: { src: 'http://localhost:5000/artists' } });
      }
    } catch (error) {
      console.log('Error while submitting form:', error);
    }
  };

  const formNames = [
    { name: 'artistId', placeholder: 'Artist ID' },
    { name: 'id', placeholder: 'Album ID' },
    { name: 'name', placeholder: 'Album Name' },
    { name: 'len', placeholder: 'Number of Tracks' },
    { name: 'tracks', placeholder: 'Track names (comma-separated)' },
    { name: 'coverImg', placeholder: 'Cover Image' },
    { name: 'description', placeholder: 'Album Description', as: 'textarea' },
  ];

  return (
    <>
      <main>
        <div>This is album form</div>
        {/* {editData !== null && (
          <>
            <h1>{editData.toEdit ? 'Edit' : 'New'} Album</h1>
            <Header title='Album Details' />
            <Formik initialValues={editData} validationSchema={AddNewSchema} onSubmit={handleSubmit} enableReinitialize>
              <Form>
                {formNames.map((formItem, index) => (
                  <Fragment key={index}>
                    <FormItem name={formItem.name} as={formItem.as} placeholder={formItem.placeholder} type='text' />
                  </Fragment>
                ))}
                <button type='submit'>{editData.toEdit ? 'Update' : 'Submit'}</button>
              </Form>
            </Formik>
          </>
        )} */}
      </main>
    </>
  );
};

export { AlbumForm };
