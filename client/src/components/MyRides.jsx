import React from 'react'
import CardDeck from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function AllRides(props) {
  return (
    <div className="allrides">
      <h3>My Rides</h3>
      <CardDeck>
        {props.posts && props.posts.map(post => (
          <div key={post.id}>
            {props.joinedPosts && props.joinedPosts.map(joined => (
              <div key={joined.id}> 
              { (post.id == joined.post_id)?(
                <div>
                  { (props.currentUserID === joined.user_id)? (
                    <Card>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      <div className="eachride">
                        <Card.Title> From {post.origin} to {post.destination} </Card.Title>
                        <p>User: {post.user_id}</p>
                        <p>Date: {post.date}, {post.time}</p>
                        <p>Seats: {post.seats}</p>
                        <Button variant="secondary" name={joined.id} onClick={props.handleRideLeaving}>Leave Ride</Button>
                      </div>
                    </Card>
                  ):null}
                  </div>
                ):null}
              </div>
            ))}
          </div>
        ))}
      </CardDeck>
    </div>
  )
}
