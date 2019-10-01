import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>Are you looking to
        <Link to="/allrides"><button>Search through all rides</button></Link> or
        <Link to="/requestride"><button>Request a ride</button></Link>?</h3>
      </div>
    )
  }
}



