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

  const { state } = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    const fetchData = async () => {
      try {
        //TODO: change to state.src later
        const { data } = await axios.get(currentSource);

        const artistData = data.filter((data: Artist[]) => {
          return data.id === artistId;
        });

        console.log('artistData: ', artistData);

        setData(data);
      } catch (error) {
        console.log('Error fetch data in ArtistDetail');
      }
    };

    fetchData();
  }, []);

  const modifiedData = data.map((data) => ({ artistId: data.id, value: data.name, description: data.description }));

  return (
    <div>
      <Navigation />
      <h1>Artist Detail</h1>

      {modifiedData.map((artist, index) => {
        return (
          <section key={artistId}>
            <header>{artist.value}</header>
            <footer></footer>
          </section>
        );
      })}
    </div>
  );
};

export { ArtistDetail };
