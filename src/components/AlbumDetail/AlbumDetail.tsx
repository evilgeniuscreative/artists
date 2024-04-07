import React, { useEffect, useState } from 'react';
import { Navigation, Header } from '..';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './albumDetail.css';

type Album = {
  toEdit: boolean;
  id: string;
  name: string;
  description: string;
  len: number;
  url: string;
  coverImg: string;
  tracks: string;
};

const AlbumDetail = () => {
  console.log('Album Detail rendered');
  const { id, albumId } = useParams();
  console.log('id: ', { id, albumId });
  const path = `http://localhost:5000/artists/${id}`;

  const [albumData, setAlbumData] = useState<Album | undefined>(undefined);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //TODO: change to state.src later
        const { data } = await axios.get(path);
        // data is album
        const foundAlbum = (data?.albums || []).find((item: Album) => {
          return item.id === albumId;
        });
        console.log({ foundAlbum: foundAlbum });
        setAlbumData(foundAlbum);
      } catch (error) {
        console.log('Error fetch data in Album Detail: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header title='Album Details' />
      <Navigation />
      <main>
        <>
          <h1>Album Detail</h1>
          <div className='rainbow-line'></div>
          {!albumData ? (
            <div>loading...</div>
          ) : (
            <section className='album-detail' key={id}>
              <article>
                <a className='album-image' href={albumData.url} title={albumData.url} target='_blank' rel='noreferrer'>
                  <img src={albumData.coverImg} alt={albumData.name} />
                </a>
                <div className='detail'>
                  <h2>{albumData.name}</h2>

                  {albumData.description}
                  <h2>Tracks ({albumData.len}):</h2>
                  <ul>
                    {albumData.tracks.split(',').map((track: string) => {
                      return <li key={track}>{track}</li>;
                    })}
                  </ul>
                </div>
              </article>
            </section>
          )}
          ;
        </>
        <footer className='rightNote'>
          <Link className='button' to={`/artist-detail/${id}/albums/${albumId}/edit`}>
            Edit Album
          </Link>
          <Link className='button ' to={`/artist-detail/${id}/albums`}>
            Back
          </Link>
        </footer>
      </main>
    </div>
  );
};

export { AlbumDetail };
