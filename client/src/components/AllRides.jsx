import React from 'react'

export default function AllRides(props) {
  return (
    <div className="allrides">
      <h3>All Rides</h3>
      {props.posts.map(post => (
        <div>
          <p>{post.origin}</p>
          <p>{post.destination}</p>
        </div>
      ))}
    </div>
  )
}
