import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Navigation } from '../Navigation';
import './artistDetail.css';
import { PageTitle } from '../PageTitle';

type Album = {
  toEdit: boolean;
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
              <article>
                <div className='detail'>
                  <a className='artist-image' href={details.url} title={details.url} target='_blank' rel='noreferrer'>
                    <img src={details.image} alt={details.name} />
                  </a>
                  <section className='artist-info'>
                    <h1 className='artist-title'>{details.name}</h1>
                    <p>{details.description}</p>
                    {details.albums.length > 0 ? (
                      <div>
                        <h2 className='albums-section'>Albums</h2>

                        {details.albums.map((album: Album) => {
                          return (
                            <div className='album-detail' key={album.id}>
                              <div className='album-thumbnail'>
                                <img src={album.coverImg} alt={album.name} />
                                <div className='album-full'>
                                  <img src={album.coverImg} alt={album.name} />
                                </div>
                              </div>
                              <h3>
                                {album.name}
                                <Link to={`/album?edit=true&id=${album.id}&artistId=${details.id}`} className='button edit rightButton'>
                                  Edit Album
                                </Link>
                              </h3>
                              <ul>
                                <li>{album.description}</li>
                                <li>
                                  {album.len} tracks:
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
                <Link className='button' to={`/album/?artistId=${id}`}>
                  Add Album
                </Link>
                <Link className='button' to={`/form/${id}`}>
                  Edit Artist
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
