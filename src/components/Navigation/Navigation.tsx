import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const Navigation = () => {
  return (
    <div>
      <nav id='nav'>
        <Link to='/'>
          <span className='nav-item'>Artist List</span>
        </Link>
        <Link to='/form' state={{ pageTitle: 'Artist' }}>
          <span className='nav-item'>Add Artist</span>
        </Link>
      </nav>
    </div>
  );
};

export { Navigation };
