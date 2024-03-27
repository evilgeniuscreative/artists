import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const Navigation = () => {
  return (
    <div>
      <nav id='nav'>
        <Link className='nav-item' to='/'>
          Home
        </Link>
        <Link className='nav-item' to='/table'>
          Table View
        </Link>

        <Link className='nav-item' to='/form' state={{ pageTitle: 'Artist' }}>
          Form
        </Link>
      </nav>
    </div>
  );
};

export { Navigation };
