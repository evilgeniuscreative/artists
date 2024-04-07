import react, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import truncate from '../../Utils/TruncateText';
import { Navigation } from '../Navigation';
import { Header } from '../Header';
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
  const [data, setData] = useState<Data[]>([]);
  // move this to  a constant file.
  const path = 'http://localhost:5000/artists';

  const location = useLocation();
  const { id, isAlz } = useParams();

  const isAlbums = location.pathname.includes('albums');

  const title = isAlbums ? 'Albums' : 'Artists';
  let currentPathname = location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //TODO: change to state.src later
        const { data } = await axios.get(path);
        if (isAlbums) {
          const artist = data.filter((data: Artist) => data.id === id);
          setData(artist);
        } else {
          setData(data as any[]);
        }
      } catch (error) {
        console.log('Error fetch data in TableView');
      }
    };

    fetchData();
  }, []);

  const modifiedData = isAlbums
    ? (data?.[0]?.albums || []).map((album) => ({
        id: album?.id,
        artistId: album?.artistId,
        value: album?.name,
        description: album?.description,
        image: album?.coverImg,
        path: `/artist-detail/${album?.artistId}/albums/${album?.id}`,
        formPath: `/form/${album?.id}`,
      }))
    : data.map((data) => ({
        id: data.id,
        value: data.name,
        description: data.description,
        image: data.image,
        path: `/artist-detail/${data.id}`,
        formPath: `/form/${data.id}`,
      }));
  console.log({ modifiedData });
  return (
    <div>
      <Header title='Fuck' />
      <Navigation />
      <main>
        <h1>{title} List</h1>
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
            {!!modifiedData.length &&
              modifiedData.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className='image-cell'>
                      <Link to={item.path}>
                        <span title={item.value} className='thumbnail-image' style={{ backgroundImage: `url(${item.image || '/noimage.png'})` }}></span>
                      </Link>
                    </td>
                    <td>
                      <Link className='no-decoration' to={item.path}>
                        {item.value}
                      </Link>
                    </td>
                    <td>
                      {truncate(125, item.description)} ...
                      <Link className='edit' to={item.path}>
                        [ more ]
                      </Link>
                    </td>
                    <td>
                      <Link className='button' to={item.formPath}>
                        Edit
                      </Link>
                    </td>
                    <td>
                      <a>Delete</a>
                    </td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export { TableView };
