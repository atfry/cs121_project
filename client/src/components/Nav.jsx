import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

  return (
    <header>
      <nav id="nav-bar">
        <Link to="/home">Home</Link>
        <Link to="/allrides">All Rides</Link>
        <Link to="requestride">Request a ride</Link>
        <button>Log out</button>
      </nav>
    </header>
  )
}

export default Nav;