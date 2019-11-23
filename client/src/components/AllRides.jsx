import React from 'react'
import CardDeck from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function AllRides(props) {
  // The posts now hold the user id associated with a post
  // This render function only makes the delete and edit buttons show up if the post's user_id match the current user id
  // The join button only shows up if the post user_id and current user id don't match
  return (
    <div className="allrides">
      <h3>All Rides</h3>
      <CardDeck>
        {props.posts && props.posts.map(post => (
          <div>
            {(props.myRides.indexOf(post.id.toString()) === -1)?(
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <div key={post.user_id} className="eachride">
                  <Card.Title> From {post.origin} to {post.destination} </Card.Title>
                  <p>User: {post.user_id}</p>
                  <p>Date: {post.date}, {post.time}</p>
                  <p>Seats: {post.seats}</p>
                  <div>
                  { (props.currentUserID === post.user_id)?(<div>
                    <Button variant="secondary" name={post.id} onClick={props.handlePostDelete}>Delete</Button>
                    <Button variant="secondary" onClick={() => props.showEditForm(post.id)}>Edit</Button></div>):
                    <Button variant="secondary" name={post.id} onClick={props.handleJoinSubmit}>Join</Button>}
                  </div>

                </div>
              </Card>
            ):null}
          </div>
        ))}
      </CardDeck>
    </div>
  )
}