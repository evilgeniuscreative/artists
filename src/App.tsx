import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { TableView, FOF, InputForm, ArtistDetail } from './components/';
import { AlbumForm } from './components/AlbumForm/AlbumForm';

// TODO: STYLING FOR THE TABLE VIEW
// Will have a form from FORMIK.org
// Read documentations and examples
// can you get json-server documentation patch and etc requests

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TableView />} />
        <Route index element={<TableView />} />
        <Route path='/table' element={<TableView />}></Route>
        <Route path='/form/:id?' element={<InputForm />}></Route>
        <Route path='/album' element={<AlbumForm />}></Route>
        <Route path='/artist-detail/:id' element={<ArtistDetail />}></Route>
        <Route path='*' element={<FOF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
