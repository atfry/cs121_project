import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import CardDeck from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function UserProfile(props) {
    return (
        <div>
            <br />
            <div className="user">
                <h3>Username: {props.currentUserName}</h3>
            </div>
            <div className="email">
                <h4>Email: {props.email}</h4>
            </div>
            <br />
            <Container>
                <Row>
                    <Col>
                        <div className="stat">
                            {props.myRides.length}
                        </div>
                    </Col>
                    <Col>
                        <div className="stat">
                            {props.joinedPosts.length}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col> <div className="email">
                        Posts
                    </div> </Col>
                    <Col> <div className="email">
                        Number of Rides Joined
                    </div> </Col>
                </Row>
                <br />
                <div className="stat">
                    Posts
                </div>
                <Row>
                    <Col>
                        <CardDeck>
                            {props.posts && props.posts.map(post => (
                            <div key={post.id}>
                                { ( (props.myRides.indexOf(post.id.toString()) !== -1 || post.seats == 0) && props.currentUserID === post.user_id)?(
                                    <div>
                                        <Card>
                                        <Card.Img variant="top" src="holder.js/100px180" />
                                        <div className="eachride">
                                            <Card.Title> From {post.origin} to {post.destination} </Card.Title>
                                            <p><Button variant="link" size="lg" name={post.user_id} onClick={props.goToUserProfile}>User: {post.user_name}</Button></p>
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
                    </Col>
                </Row>
            </Container>
        </div>
    )
}