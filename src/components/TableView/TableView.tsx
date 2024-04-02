import react, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import truncate from '../../Utils/TruncateText';
import { Navigation } from '../Navigation';
import { PageTitle } from '../PageTitle';
import './tableView.css';

const TableView = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentSource, setCurrentSource] = useState('http://localhost:5000/artists');

  const { state } = useLocation();
  console.log('location state: ', useLocation());

  useEffect(() => {
    const fetchData = async () => {
      try {
        //TODO: change to state.src later
        const { data } = await axios.get(currentSource);
        setData(data as any[]);
      } catch (error) {
        console.log('Error fetch data in TableView');
      }
    };

    fetchData();
  }, []);

  const modifiedData = data.map((data) => ({ artistId: data.id, value: data.name, description: data.description, image: data.image }));

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
                <tr key={item.artistId}>
                  <td className='image-cell'>
                    <Link to={`/artist-detail/?id=${item.artistId}`}>
                      <span title={item.value} className='thumbnail-image' style={{ backgroundImage: `url(${item.image || '/noimage.png'})` }}></span>
                    </Link>
                  </td>
                  <td>
                    <Link className='no-decoration' to={`/artist-detail/${item.artistId}`}>
                      {item.value}
                    </Link>
                  </td>
                  <td>
                    {truncate(125, item.description)} ...
                    <Link className='edit' to={`/artist-detail/${item.artistId}`}>
                      [ more ]
                    </Link>
                  </td>
                  <td>
                    <Link className='button' to={`/form/${item.artistId}`}>
                      Edit
                    </Link>
                  </td>
                  <td>
                    <a
                      className='delete'
                      onClick={async () => {
                        if (window.confirm('Do you want to delete this?') === true) {
                          await axios.delete(`http://localhost:5000/artists/${item.artistId}`);
                          setData((prev) => prev.filter((element) => element.id !== item.artistId));
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
