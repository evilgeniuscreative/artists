import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Navigation } from '../Navigation';

type Artist = {
  id: string;
  name: string;
  description: string;
  albums: string[];
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
  const modifiedData = artistData.map((d) => ({ artistId: d.id, name: d.name, description: d.description, image: d.image, url: d.url }));

  return (
    <div>
      <Navigation />

      <main>
        <h1>Artist Detail</h1>

        {modifiedData.map((artist, index) => {
          return (
            <section key={artistId}>
              <header>
                <h2>{artist.name}</h2>
              </header>
              <article>
                <p>{artist.description}</p>
              </article>
              <footer></footer>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export { ArtistDetail };
