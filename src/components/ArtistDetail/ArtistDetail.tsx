import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Navigation } from '../Navigation';
import './artistDetail.css';

type Album = {
  id: string;
  albumId: string;
  albumName: string;
  albumDescription: string;
  albumLength: string;
  albumCoverImg: string;
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
  const queryParameters = new URLSearchParams(window.location.search);
  const artistId = queryParameters.get('id');
  console.log('artistId: ', artistId);

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
          return data.id === artistId;
        });

        console.log('artistData: ', artistData);

        setArtistData(artistData);
      } catch (error) {
        console.log('Error fetch data in ArtistDetail');
      }
    };

    fetchData();
  }, []);

  console.log('artistData a', artistData);
  const modifiedData = artistData.map((d) => ({ id: d.id, artistId: d.id, name: d.name, description: d.description, image: d.image, url: d.url, albums: d.albums }));

  return (
    <div>
      <Navigation />

      <main>
        <h1>Artist Detail</h1>

        {modifiedData.map((artist) => {
          console.log('modifiedData: ', modifiedData);
          return (
            <section className='artist-detail' key={artistId}>
              <header>
                <h2>{artist.name}</h2>
              </header>
              <article>
                <div className='detail'>
                  <a className='artist-image' href={artist.url} title={artist.url} target='_blank' rel='noreferrer'>
                    <img src={artist.image} alt={artist.name} />
                  </a>
                  <section className='artist-info'>
                    <p>{artist.description}</p>
                    {artist.albums.length > 0 ? (
                      <div>
                        <p>
                          <strong>Albums</strong>
                          <br />
                        </p>

                        {artist.albums.map((album: Album) => {
                          album['id'] = artist.id;
                          console.log('album: ', album);
                          return (
                            <div>
                              <div className='album-thumbnail'>
                                <img src={album.albumCoverImg} alt={album.albumName} />
                                <div className='album-full'>
                                  <img src={album.albumCoverImg} alt={album.albumName} />
                                </div>
                              </div>
                              <ul>
                                {/* <li key={album.albumId}> */}
                                {/* <a className='edit' onClick={() => navigate('/album', { state: { editData: album } })}>
                                    [ Edit ]
                                  </a> */}
                                {/* </li> */}
                                <li>{album.albumDescription}</li>
                                <li>
                                  {album.albumLength}
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
                      <a href={artist.url}>{artist.url}</a>
                    </p>
                  </section>
                </div>
              </article>
              <footer className='rightNote'>
                <button className='edit' onClick={() => navigate('/form', { state: { editData: modifiedData[0] } })}>
                  Edit
                </button>
              </footer>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export { ArtistDetail };
