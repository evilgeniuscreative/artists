import react, { FunctionComponent } from "react";
import {Link } from "react-router-dom";

import './home.css';

const Home: FunctionComponent = () => {

  return (
  <main id="home">
    <h1>What do you want to do?</h1>
    <div className="chooser">
      <p><a href="/list">List View</a></p>
      <p><a href="/table">Table View</a></p>
      <Link to='/form'
   state={{pageTitle:"Artist"}}
><p>Form</p></Link>
    </div>
  
  </main>
  )

}

export { Home }