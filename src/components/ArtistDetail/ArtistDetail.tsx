import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Navigation } from '../Navigation';
import './artistDetail.css';
import { PageTitle } from '../PageTitle';

type Album = {
  artistId: string;
  id: string;
  name: string;
  description: string;
  len: number;
  coverImg: string;
  tracks: string;
};

type Artist = {
  id: string;
  name: string;
  description: string;
  albums: Album[];
  image: string;
  url: string;
};

const ArtistDetail = () => {
  const { id } = useParams();

  const [data, setData] = useState<any[]>([]);
  const [currentSource, setCurrentSource] = useState('http://localhost:5000/artists/');
  const [artistData, setArtistData] = useState<Artist[]>([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //TODO: change to state.src later
        const { data } = await axios.get(currentSource);

        const artistData = data.filter((data: Artist) => {
          console.log('data artist: ', data);
          return data.id === id;
        });

        console.log('artistData: ', artistData);

        setArtistData(artistData);
      } catch (error) {
        console.log('Error fetch data in ArtistDetail');
      }
    };

    fetchData();
  }, []);

  const modifiedData = artistData.map((d) => ({ id: d.id, name: d.name, description: d.description, image: d.image, url: d.url, albums: d.albums }));

  return (
    <div>
      <PageTitle title='Artist Details' />;
      <Navigation />
      <main>
        <h1>Artist Detail</h1>
        <div className='rainbow-line'></div>
        {modifiedData.map((details) => {
          console.log('modifiedData: ', modifiedData);
          return (
            <section className='artist-detail' key={id}>
              <header>
                <h2>{details.name}</h2>
              </header>
              <article>
                <div className='detail'>
                  <a className='artist-image' href={details.url} title={details.url} target='_blank' rel='noreferrer'>
                    <img src={details.image} alt={details.name} />
                  </a>
                  <section className='artist-info'>
                    <p>{details.description}</p>
                    {details.albums.length > 0 ? (
                      <div>
                        <p>
                          <strong>Albums</strong>
                          <br />
                        </p>

                        {details.albums.map((album: Album) => {
                          return (
                            <div key={album.id}>
                              <div className='album-thumbnail'>
                                <img src={album.coverImg} alt={album.name} />
                                <div className='album-full'>
                                  <img src={album.coverImg} alt={album.name} />
                                </div>
                              </div>
                              <ul>
                                {/* <li key={album.albumId}> */}
                                {/* <a className='edit' onClick={() => navigate('/album', { state: { editData: album } })}>
                                    [ Edit ]
                                  </a> */}
                                {/* </li> */}
                                <li>{album.description}</li>
                                <li>
                                  {album.len}
                                  <ul>
                                    {album.tracks.split(',').map((track) => {
                                      return <li key={track}>{track}</li>;
                                    })}
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}

                    <p>
                      <strong>Url: </strong>
                      <a href={details.url}>{details.url}</a>
                    </p>
                  </section>
                </div>
              </article>
              <footer className='rightNote'>
                <Link className='button' to={`/form/${id}`}>
                  Edit
                </Link>
              </footer>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export { ArtistDetail };
