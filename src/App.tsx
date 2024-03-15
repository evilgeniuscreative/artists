import React, {useEffect,useState} from 'react';
import './App.css';
import { Artist } from './types';
import { ListView, TableView } from  './components/';


// TODO: STYLING FOR THE TABLE VIEW
// Will have a form from FORMIK.org
// Read documentations and examples
// can you get json-server documentation patch and etc requests

function App() {

const [artists, setArtists] = useState<Artist[]>([]);

useEffect(() => {
  fetch('http://localhost:5000/artists')
  .then(response => response.json())
  .then(data => setArtists(data)
  )
},[]);



const modifiedData = artists.map((data)=>({id:data.id,value: data.name,description: data.description}));

console.log('DATA outside USEEFFECT',artists)
  return (
    <div className="App">

      {
          artists.length? <><ListView data={modifiedData} /> <hr/> <TableView data={modifiedData}/></> : <><div className="loader"></div></>
      }
      
    </div>
  );
}

export default App;
