import React from 'react'

export default (props) => (
  <>
    <div className="riderequest">
      <h3>Request or Post a Ride!</h3>

      <form className="post" onSubmit={props.handlePostSubmit}>
        <label htmlFor="driver">Are you driving?</label>
        <label>
          <input
            type="checkbox"
            name="driver"
            value={props.postFormData.driver}
            id="driver"
            onChange={props.handleCheckbox}
          /> Yes
        </label>

        <br />

        <label htmlFor="origin">Origin</label>
        <input
          type="text"
          name="origin"
          value={props.postFormData.origin}
          placeholder="Where are you leaving from?"
          id="origin"
          onChange={props.handlePostFormChange}
        />

        <br />

        <label htmlFor="destination">Destination</label>
        <input
          type="string"
          name="destination"
          value={props.postFormData.destination}
          placeholder="Where are you going?"
          id="destination"
          onChange={props.handlePostFormChange}
        />

        <br />

        <label htmlFor="date">What day do you want to leave?</label>
        <input
          type="date"
          name="date"
          value={props.postFormData.date}
          id="date"
          onChange={props.handlePostFormChange}
        />

        <br />

        <label htmlFor="time">Time</label>
        <input
          type="string"
          name="time"
          value={props.postFormData.time}
          placeholder="What time are you leaving at?"
          id="time"
          onChange={props.handlePostFormChange}
        />

        <br />

        <label htmlFor="seats">Seats</label>
        <input
          type="integer"
          name="seats"
          value={props.postFormData.seats}
          placeholder="How many seats do you have/need?"
          id="seats"
          onChange={props.handlePostFormChange}
        />

        <br />

        <label htmlFor="stops"><span>  Are you willing to make stops?  </span></label>
        <label>
          <span> <input
            type="checkbox"
            name="stops"
            value={props.postFormData.stops}
            id="stops"
            onChange={props.handleCheckbox}
          /></span>Yes
          </label>

        <br />

        <div className="submit"><input
          type="submit"
          value="Post"
        /></div>
      </form>
    </div>
  </>
)
