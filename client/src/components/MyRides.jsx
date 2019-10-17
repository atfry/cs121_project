import React from 'react'

export default function MyRides(props) {
  return (
    <div className="MyRides">
      <h3>My Rides</h3>

      {props.joinedPosts && props.joinedPosts.map(joined => (
        <div key={joined.id} className="myride">
          <p>User: {joined.userId}</p>
          <p>Origin: {joined.origin}</p>
          <p>Destination: {joined.destination}</p>
          <button>Leave Ride</button>
        </div>
      ))}


    </div>
  )
}
