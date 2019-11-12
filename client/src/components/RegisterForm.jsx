import React from 'react'

export default (props) => (
  <>
    <div className="registerform">
      <h3>Register</h3>

      <form className="register" onSubmit={props.handleRegisterSubmit}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          name="username"
          value={props.registerFormData.username}
          id="username"
          onChange={props.handleRegisterFormChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={props.registerFormData.email}
          id="email"
          onChange={props.handleRegisterFormChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={props.registerFormData.password}
          id="password"
          onChange={props.handleRegisterFormChange}
        />

        <div className="submit"><input
          type="submit"
          value="Sign Up"
        /></div>

      </form>
    </div>
  </>
)

