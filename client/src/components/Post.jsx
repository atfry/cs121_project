import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import CardDeck from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function Post(props) {
    return (
        <div>
            <br />
            <h2> Ride Details </h2>
            <br />
            <h3> From {props.examinePost.origin} to {props.examinePost.destination} </h3>
            <br />
            <Container>
                <Row>
                    <Col> <div className="stat">
                        Driver: {props.examinePost.user_name}
                    </div></Col>
                    <Col> <div className="stat">
                        Date and Time: {props.examinePost.time}, {props.examinePost.date}
                    </div> </Col>
                </Row>
                <br />
                <Row>
                    <Col><div className="email">
                        Seats Available: {props.examinePost.seats}
                    </div></Col>
                    <Col> <div className="email">
                        Riders:
                        <div>
                            {props.riders && props.riders.map(rider => (
                                <Button variant="link" name={rider.id} onClick={props.goToUserProfile}>{rider.name}</Button>
                            ))}
                        </div>
                    </div></Col>
                </Row>
                <br />
                <Row>
                    <Col>
                    { (props.examinePost.seats !== 0 && props.myRides.indexOf(props.examinePost.id.toString()) === -1)? (<div>
                        <Button variant="secondary" name={props.examinePost.id}  onClick={props.handleJoinSubmit}>Join</Button></div>
                    ):(<div>{(props.myRides.indexOf(props.examinePost.id.toString()) !== -1)?(
                        <div className="email"> You have already joined this ride </div>):
                        <div className="email"> Ride is Full </div>
                    }</div>)}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}