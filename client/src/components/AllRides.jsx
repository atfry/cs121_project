import React from 'react'
import CardDeck from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function AllRides(props) {
  return (
    <div className="allrides">
      <h3>All Rides</h3>
      <CardDeck>
      {props.posts && props.posts.map(post => (
        <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <div key={post.id} className="eachride">
          <Card.Title> From {post.origin} to {post.destination} </Card.Title>
          <p>User: {post.userId}</p>

          <Button variant="secondary" name={post.id}
            onClick={props.handlePostDelete}>Delete</Button>

          <Button variant="secondary" onClick={() => props.showEditForm(post.id)}>Edit</Button>
          <Button variant="secondary" onClick={() => props.handleJoinSubmit(post)}>Join</Button>
        
        </div>
        </Card>
      ))}
      </CardDeck>
    </div>
  )
}
