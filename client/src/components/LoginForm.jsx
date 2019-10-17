import React from 'react'

export default (props) => (
  <>
    <div className="loginform">
      <h3>Login</h3>
      <form className="login" onSubmit={props.handleLoginSubmit}>

        <label htmlFor="name">Username</label>
        <input
          type="text"
          name="username"
          value={props.loginFormData.username}
          id="username"
          onChange={props.handleLoginFormChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={props.loginFormData.password}
          id="password"
          onChange={props.handleLoginFormChange}
        />

        <input
          type="submit"
          value="Log In"
        />

      </form>

    </div>
  </>
)
