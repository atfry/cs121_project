import React from 'react'
import CardDeck from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default function SearchResults(props) {
  return (
    <div className="searchresults">
      <h2>Search Results</h2>
      <div className="filterform">
      <br />
      <Container>
        <h5>Refine Results</h5>
      <Form>
        <Form.Row> 
          <Col>
            <Form.Control
            type="text"
            name="origin"
            value={props.filterFormData.origin}
            placeholder="Where are you leaving from?"
            onChange={props.handleFilterFormChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              name="destination"
              value={props.filterFormData.destination}
              placeholder="Where do you want to go?"
              onChange={props.handleFilterFormChange}
              />
          </Col>
          <Col>
            <Form.Control
            type="date"
            name="date"
            value={props.filterFormData.date}
            onChange={props.handleFilterFormChange}
            id="date"
            />
          </Col>
          <Col>
            <Button variant="secondary" onClick={props.handleFilterSubmit}>Filter</Button>
          </Col>
          <Col>
            <Button variant="secondary" onClick={props.handleFilterClear}>Clear Filters</Button>
          </Col>
        </Form.Row>
      </Form>
      </Container>
      <br />
      </div>

      <CardDeck>
        {props.filteredPosts && props.filteredPosts.map(post => (
          <div>
            {(props.myRides.indexOf(post.id.toString()) === -1 || post.user_id == props.currentUserID)?(
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <div key={post.user_id} className="eachride">
                  <Card.Title> From {post.origin} to {post.destination} </Card.Title>
                  <p>User: {post.user_name}</p>
                  <p>Date: {post.date}, {post.time}</p>
                  <p>Seats: {post.seats}</p>
                  <div>
                  { (props.currentUserID === post.user_id)?(<div>
                    <Button variant="secondary" name={post.id} onClick={props.handlePostDelete}>Delete</Button>
                    <Button variant="secondary" onClick={() => props.showEditForm(post.id)}>Edit</Button></div>):
                    <Button variant="secondary" name={post.id} post={post} onClick={props.handleJoinSubmit}>Join</Button>}
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