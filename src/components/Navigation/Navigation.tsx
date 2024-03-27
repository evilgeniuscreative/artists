import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const Navigation = () => {
  return (
    <div>
      <nav id='nav'>
        <Link to='/'>
          <span className='nav-item'>Home</span>
        </Link>
        <Link to='/table'>
          <span className='nav-item'>Artist List</span>
        </Link>

        <Link to='/form' state={{ pageTitle: 'Artist' }}>
          <span className='nav-item'>Add</span>
        </Link>
      </nav>
    </div>
  );
};

export { Navigation };
