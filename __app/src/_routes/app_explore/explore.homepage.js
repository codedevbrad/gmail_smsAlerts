import React from 'react';
import './explore.styles.scss';
import { Link } from 'react-router-dom';

const App_explore = ( ) => {

  return (
      <div className="app__explore">
          <h1> explore </h1>
          <Link to={ "/app" }>
              <li> app </li>
          </Link>
      </div>
  )
}

export default App_explore;
