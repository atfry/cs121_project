import React from 'react'

export default (props) => {
  return (
    <div>
      <h3>Edit Your Post</h3>
      <form className="post" onSubmit={props.handlePostUpdate}>
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

        <label htmlFor="destination">Destination</label>
        <input
          type="string"
          name="destination"
          value={props.postFormData.destination}
          placeholder="Where are you going?"
          id="destination"
          onChange={props.handlePostFormChange}
        />

        <label htmlFor="date">What day do you want to leave?</label>
        <input
          type="date"
          name="date"
          value={props.postFormData.date}
          id="date"
          onChange={props.handlePostFormChange}
        />

        <label htmlFor="time">Time</label>
        <input
          type="string"
          name="time"
          value={props.postFormData.time}
          placeholder="What time are you leaving at?"
          id="time"
          onChange={props.handlePostFormChange}
        />

        <label htmlFor="seats">Seats</label>
        <input
          type="integer"
          name="seats"
          value={props.postFormData.seats}
          placeholder="How many seats do you have/need?"
          id="seats"
          onChange={props.handlePostFormChange}
        />

        <label htmlFor="stops">Are you willing to make stops?</label>
        <label>
          <input
            type="checkbox"
            name="stops"
            value={props.postFormData.stops}
            id="stops"
            onChange={props.handleCheckbox}
          />Yes
          </label>

        <input
          type="submit"
          value="Update Post"
        />
      </form>

    </div>
  )
}
