import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Artist } from './types';
import { TableView, FOF, InputForm } from './components/';
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
        <Route path='/form' element={<InputForm />}></Route>
        <Route path='/album' element={<AlbumForm />}></Route>
        <Route path='*' element={<FOF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;