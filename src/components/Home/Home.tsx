import react, { FunctionComponent } from "react";
import './home.css';

const Home: FunctionComponent = () => {

  return (
  <main id="home">
    <h1>What do you want to do?</h1>
    <div className="chooser">
      <p><a href="/list">List View</a></p>
      <p><a href="/table">Table View</a></p>
      <p><a href="/new">Form Page</a></p>
    </div>
  
  </main>
  )

}

export { Home }