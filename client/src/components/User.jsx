import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import CardDeck from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function User(props) {
    return (
        <div>
            <br />
            <h2> User Profile </h2>
            <br />
            <div className="user">
                <h3>Username: {props.examineUser.name}</h3>
            </div>
            <div className="email">
                <h4>Email: {props.examineUser.email}</h4>
            </div>
            <br />
            <Container>
                <br />
                <div className="stat">
                    Posts
                </div>
                <Row>
                    <Col>
                        <CardDeck>
                            {props.posts && props.posts.map(post => (
                            <div key={post.id}>
                                { ( props.examineUser.id === post.user_id)?(
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
                                                <Button variant="secondary" name={post.id} post={post} onClick={props.handleJoinSubmit}>Join</Button>}
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