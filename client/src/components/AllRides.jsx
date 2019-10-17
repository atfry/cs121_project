import React from 'react'

export default function AllRides(props) {
  return (
    <div className="allrides">
      <h3>All Rides</h3>
      {props.posts && props.posts.map(post => (
        <div key={post.id} className="eachride">
          <p>User: {post.userId}</p>
          <p>Origin: {post.origin}</p>
          <p>Destination: {post.destination}</p>

          <button name={post.id}
            onClick={props.handlePostDelete}>Delete
            </button>
          <button onClick={() => props.showEditForm(post.id)}>Edit</button>
          <button onClick={() => props.handleJoinSubmit(post)}>Join</button>
        </div>
      ))}
    </div>
  )
}
