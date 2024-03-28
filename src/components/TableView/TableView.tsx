import react, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  const modifiedData = data.map((data) => ({ artistId: data.id, value: data.name, description: data.description }));

  return (
    <div>
      <Navigation />
      <h1>Artist List</h1>
      <table>
        <thead>
          <tr>
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
                <td>
                  <a href={`artist-detail/?id=${item.artistId}`}>{item.value}</a>
                </td>
                <td>{item.description}</td>
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
