import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {

  return (
    <header>
      <nav id="nav-bar">
        <Link to="/home">Home</Link>
        <Link to="/allrides">All Rides</Link>
        <Link to="/requestride">Post a Ride</Link>
        <Link to="/myrides">My Rides</Link>
        <Link to="/userprofile">My Profile</Link>
        <button onClick={props.handleLogout}>Log out</button>
      </nav>
    </header>
  )
}

export default Nav;