import React from 'react'

export default (props) => (
  <>
    <div className="riderequest">
      <h3>Request or Post a Ride!</h3>

      <form className="post" >
        <label htmlFor="driver">Are you driving?</label>
        <label>
          <input
            type="radio"
            name="driver"
            value="false"
            id="driver"
          /> Yes
        </label>

        <br />
        <br />

        <label htmlFor="origin">Origin</label>
          <input
            type="text"
            name="origin"
            placeholder="Where are you leaving from?"
            id="origin"
          />

          <label htmlFor="destination">Destination</label>
          <input
            type="string"
            name="destination"
            placeholder="Where are you going?"
            id="destination"
          />

          <label htmlFor="date">What day do you want to leave?</label>
          <input
            type="date"
            name="date"
            id="date"
          />

          <label htmlFor="time">Time</label>
          <input
            type="string"
            name="time"
            placeholder="What time are you leaving at?"
            id="time"
          />

          <label htmlFor="seats">Seats</label>
          <input
            type="integer"
            name="seats"
            placeholder="How many seats do you have/need?"
            id="seats"
          />

          <label htmlFor="stops">Are you willing to make stops?</label>
          <label>
            <input
              type="radio"
              name="stops"
              value="false"
              id="stops"
            />Yes
          </label>

          <input
          type="submit"
          value="Post"
        />
      </form>
    </div>
  </>
)
