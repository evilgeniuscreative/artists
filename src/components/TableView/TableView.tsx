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

const TableView = () => {
  const path = 'http://localhost:5000/artists';

  const { id } = useParams();

  const location = useLocation();
  console.log('useLocation', useLocation());
  let currentPathname = location.pathname;
  const isAlbums = currentPathname.indexOf('/albums') > -1 ? true : false;
  const [data, setData] = useState<any[]>([]);

  console.log('path', path);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //TODO: change to state.src later
        const { data } = await axios.get(path);
        if (isAlbums) {
          console.log('data', data);
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

  const modifiedData = data.map((data) => ({ mainId: data.id, value: data.name, description: data.description, image: data.image }));

  return (
    <div>
      <PageTitle title='Artist List' />
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
            {modifiedData.map((item, index) => {
              return (
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
                    <a
                      className='delete'
                      onClick={async () => {
                        if (window.confirm('Do you want to delete this?') === true) {
                          await axios.delete(`http://localhost:5000/artists/${item.mainId}`);
                          setData((prev) => prev.filter((element) => element.id !== item.mainId));
                        }
                      }}
                    >
                      Delete
                    </a>
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
