import React, {useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import './App.css';
import { Artist } from './types';
import {  TableView, FOF, Home, InputForm } from  './components/';


// TODO: STYLING FOR THE TABLE VIEW
// Will have a form from FORMIK.org
// Read documentations and examples
// can you get json-server documentation patch and etc requests

function App() {


  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route index element={<Home />} />
    <Route path="/table" element={<TableView />}></Route>
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