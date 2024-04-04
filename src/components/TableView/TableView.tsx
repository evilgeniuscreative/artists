import react, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import truncate from '../../Utils/TruncateText';
import { Navigation } from '../Navigation';
import { PageTitle } from '../PageTitle';
import './tableView.css';

type useLocation = {
  pathname: string;
  search: string;
  hash: string;
  key: string;
  state: any;
};

type Album = {
  toEdit: boolean;
  id: string;
  artistId: string;
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

type Data = {
  id: string;
  name: string;
  albums?: Album[];
  mainId: string;
  value: string;
  description: string;
  image?: string;
  coverImg?: string;
  albumId?: string;
  tracks?: string;
};

const TableView = () => {
  const path = 'http://localhost:5000/artists';

  const { id, isAlz } = useParams();
  const isAlbums = Boolean(isAlz);
  const title = isAlbums ? 'Albums' : 'Artists';
  console.log('id', id, 'isAlbums', isAlbums);

  const location = useLocation();
  console.log('useLocation', useLocation());
  let currentPathname = location.pathname;

  const [data, setData] = useState<Data[]>([]);
  let albumData: Album[] = [];

  console.log('path', path);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //TODO: change to state.src later
        const { data } = await axios.get(path);
        if (isAlbums) {
          console.log('org data', data);
          const albumData = data.filter((data: Artist) => data.id === id);
          console.log('albumData', albumData[0].albums);
          setData(albumData);
        } else {
          setData(data as any[]);
        }
      } catch (error) {
        console.log('Error fetch data in TableView');
      }
    };

    fetchData();
  }, []);

  const artistData = data.map((data) => ({ mainId: data.id, value: data.name, description: data.description, image: data.image }));

  if (data[0] && data[0].albums && data[0].albums.length > 0) {
    albumData = data[0].albums.map((album) => ({
      toEdit: album.toEdit,
      id: album.id,
      artistId: album.artistId,
      name: album.name,
      description: album.description,
      len: album.len,
      coverImg: album.coverImg,
      tracks: album.tracks,
    }));
  }

  return (
    <div>
      <PageTitle title='Fuck' />
      <Navigation />
      <main>
        <h1>Artist List</h1>
        <div className='rainbow-line'></div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Value</th>
              <th>Description</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!isAlbums
              ? artistData.map((item) => (
                  <tr key={item.mainId}>
                    <td className='image-cell'>
                      <Link to={`/artist-detail/?id=${item.mainId}`}>
                        <span title={item.value} className='thumbnail-image' style={{ backgroundImage: `url(${item.image || '/noimage.png'})` }}></span>
                      </Link>
                    </td>
                    <td>
                      <Link className='no-decoration' to={`/artist-detail/${item.mainId}`}>
                        {item.value}
                      </Link>
                    </td>
                    <td>
                      {truncate(125, item.description)} ...
                      <Link className='edit' to={`/artist-detail/${item.mainId}`}>
                        [ more ]
                      </Link>
                    </td>
                    <td>
                      <Link className='button' to={`/form/${item.mainId}`}>
                        Edit
                      </Link>
                    </td>
                    <td>
                      <a>Delete</a>
                    </td>
                    <td></td>
                  </tr>
                ))
              : albumData.map((item) => (
                  <tr key={item.id}>
                    <td className='image-cell'>
                      <Link to={`/artist-detail/?id=${item.id}`}>
                        <span title={item.name} className='thumbnail-image' style={{ backgroundImage: `url(${item.coverImg || '/noimage.png'})` }}></span>
                      </Link>
                    </td>
                    <td>
                      <Link className='no-decoration' to={`/artist-detail/${item.id}`}>
                        {item.name}
                      </Link>
                    </td>
                    <td>
                      {truncate(125, item.description)} ...
                      <Link className='edit' to={`/artist-detail/${item.id}`}>
                        [ more ]
                      </Link>
                    </td>
                    <td>
                      <Link className='button' to={`/album/?edit=true&id=${item.id}artistId=${item.artistId}`}>
                        Edit
                      </Link>
                    </td>
                    <td>
                      <a>Delete</a>
                    </td>
                    <td></td>
                  </tr>
                ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export { TableView };
