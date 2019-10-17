import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

export default class Home extends Component {
  render() {
    return (
      <div>
        <br />
        <h3>Are you looking to
        <br />
        <br />
        <Link to="/allrides"><Button variant="link" size="lg">Search through all rides</Button></Link><span> or </span>
        <Link to="/requestride"><Button variant="link" size="lg">Request a ride</Button></Link><span>?</span></h3>
      </div>
    )
  }
}



