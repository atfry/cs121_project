import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import RegisterForm from './components/RegisterForm';
import AllRides from './components/AllRides';
import RideRequest from './components/RideRequest';
import { Route, withRouter } from 'react-router-dom';
import { createPost, fetchPost } from './services/posts.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'register',
      registerFormData: {
        username: '',
        password: '',
        email: ''
      },
      postFormData: {
        driver: null,
        origin: '',
        destination: '',
        date: '',
        time: '',
        seats: '',
        stops: null
      },
      posts: []
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

  handlePostFormChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      postFormData: {
        ...prevState.postFormData,
        [name]: value
      },
    }));
  }

  handlePostSubmit = async (ev) => {
    ev.preventDefault();
    const post = await createPost(this.state.postFormData);
    this.setState(prevState => ({
      posts: [...prevState.posts, post],
      postFormData: {
        driver: null,
        origin: '',
        destination: '',
        date: '',
        time: '',
        seats: '',
        stops: null
      },
    }));
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
          <RideRequest
            postFormData={this.state.postFormData}
          />
        )} />
      </div>
    );
  }
}

export default withRouter(App);
