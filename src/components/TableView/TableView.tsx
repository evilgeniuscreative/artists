import react, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import truncate from '../../Utils/TruncateText';
import { Navigation } from '../Navigation';
import './tableView.css';

const TableView = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentSource, setCurrentSource] = useState('http://localhost:5000/artists');

  const { state } = useLocation();
  const navigate = useNavigate();

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
      <Navigation />
      <h1>Artist List</h1>
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
                  <a href={`artist-detail/?id=${item.artistId}`}>
                    <span title={item.value} className='thumbnail-image' style={{ backgroundImage: `url(${item.image || '/noimage.png'})` }}></span>
                  </a>
                </td>
                <td>
                  <a className='no-decoration' href={`artist-detail/?id=${item.artistId}`}>
                    {item.value}
                  </a>
                </td>
                <td>
                  {truncate(125, item.description)} ...
                  <a className='edit' href={`artist-detail/?id=${item.artistId}`}>
                    [ more ]
                  </a>
                </td>
                <td>
                  <button className='edit' onClick={() => navigate('/form', { state: { editData: data[index] } })}>
                    Edit
                  </button>
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
    </div>
  );
};

export { TableView };
