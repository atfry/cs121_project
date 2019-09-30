import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import RegisterForm from './components/RegisterForm';
import AllRides from './components/AllRides';
import RideRequest from './components/RideRequest';
import { Route, withRouter } from 'react-router-dom';
import {createPost} from './services/api';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      registerFormData: {
        username: '',
        password: '',
        email: ''
      }

    }
  }

  handleRegisterFormChange = (ev) => {
    const { name, value } = ev.target;

    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  handleRegisterSubmit = async (ev) => {
    ev.preventDefault();
    this.setState({
      registerFormData: {
        username: '',
        password: '',
        email: ''
      }
    })
    console.log(this.registerFormData);
  }

  handlePostSubmit = async(ev) => {
    ev.preventDefault();
    
  }


  render() {
    return (
      <div className="App">
        <Nav />
        <Header />

        <RegisterForm
          registerFormData={this.state.registerFormData}
          handleRegisterSubmit={this.handleRegisterSubmit}
          handleRegisterFormChange={this.handleRegisterFormChange}
        />

        <Route path="/home" render={() => (
          <Home />
        )} />

        <Route path="/allrides" render={() => (
          <AllRides />
        )} />

        <Route path="/requestride" render={() => (
          <RideRequest />
        )} />
      </div>
    );
  }
}

export default withRouter(App);
