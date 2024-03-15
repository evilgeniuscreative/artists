import React, {useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Artist } from './types';
import { ListView, TableView, FOF, Home, InputForm } from  './components/';


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



const mappedData = artists.map((data)=>({id:data.id,value: data.name,description: data.description}));

  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route index element={<Home />} />
    <Route path="/list" element={<ListView data={mappedData}/>}></Route>
    <Route path="/table" element={<TableView data={mappedData}/>}></Route>
    <Route path="/new" element={<InputForm />}></Route>
    <Route path="*" element={<FOF />} />
  </Routes>
</BrowserRouter>
  );
}

export default App;



    // <div className="App">

    //   {
    //       artists.length? <><ListView data={modifiedData} /> <hr/> <TableView data={modifiedData}/></> : <><div className="loader"></div></>
    //   }
      
    // </div>