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

              { ( props.myRides.indexOf(post.id.toString()) !== -1 || post.seats == 0)?(
                <div>
                    <Card>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      <div className="eachride">
                        <Card.Title> From {post.origin} to {post.destination} </Card.Title>
                        <p>User: {post.user_name}</p>
                        <p>Date: {post.date}, {post.time}</p>
                        <p>Seats: {post.seats}</p>
                        { (props.currentUserID === post.user_id)?(<div>
                          <Button variant="secondary" name={post.id} onClick={props.handlePostDelete}>Delete</Button>
                          <Button variant="secondary" onClick={() => props.showEditForm(post.id)}>Edit</Button></div>):
                          <Button variant="secondary" name={post.id} onClick={props.handleRideLeaving}>Leave Ride</Button>}
                      </div>
                    </Card>
                  </div>
                ):null}
              </div>
        ))}
      </CardDeck>
    </div>
  )
}
