import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import RegisterForm from './components/RegisterForm';
import AllRides from './components/AllRides';
import RideRequest from './components/RideRequest';
import { Route, withRouter } from 'react-router-dom';
import { createPost, fetchPosts } from './services/posts.js';
import {
  ping,
  createUser,
  verifyToken,
} from './services/auth';
import './App.css';
import LoginForm from './components/LoginForm';
import { Map, GoogleApiWrapper } from 'google-maps-react';
//import {useState, useEffect} from 'react';
import MapContainer from './MapContainer.js'; // we will see if it works




// export const usePosition = () => {
//   const [position, setPosition] = useState({});
//   const [error, setError] = useState(null);
  
//   const onChange = ({coords}) => {
//     setPosition({
//       latitude: coords.latitude,
//       longitude: coords.longitude,
//     });
//   };
//   const onError = (error) => {
//     setError(error.message);
//   };
//   useEffect(() => {
//     const geo = navigator.geolocation;
//     if (!geo) {
//       setError('Geolocation is not supported');
//       return;
//     }
//     watcher = geo.watchPosition(onChange, onError);
//     return () => geo.clearWatch(watcher);
//   }, []);
//   return {...position, error};
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'register',
      loginFormData: {
        name: '',
        password: '',
      },
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

  handleLoginFormChange = (ev) => {
    const { name, value } = ev.target;

    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }));
  }

  // submits login form data and resets form
  handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    this.setState({
      loginFormData: {
        username: '',
        password: '',
      }
    })
    console.log(this.loginFormData);
    this.props.history.push('/home');
  }


  // updates registerFormData state variable 
  // with changes in the register form
  handleRegisterFormChange = (ev) => {
    const { name, value } = ev.target;

    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  // submits register form data and resets form
  // routes to home page on submit
  handleRegisterSubmit = async (ev) => {
    ev.preventDefault();
    const user = await createUser(this.state.registerFormData);
    console.log(user);
    this.setState({
      registerFormData: {
        username: '',
        password: '',
        email: ''
      }
    })
    console.log(this.registerFormData);
    this.props.history.push('/home');
  }

  // updates postFormData state variable 
  // with changes in the post form
  handlePostFormChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      postFormData: {
        ...prevState.postFormData,
        [name]: value
      },
    }));
    console.log(this.postFormData);
  }

  // submits post form data and resets form
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


  async componentDidMount() {
    const data = await ping();
    const user = await verifyToken();
    if (user) {
      this.setState({
        currentUser: user,
      })
    }
    try {

    } catch (e) {
      console.log(e.message);
    }
    const posts = await fetchPosts();
    this.setState({
      posts
    });
  }

  toggleAuthView = () => {
    this.setState(prevState => ({
      currentView: prevState.currentView === 'register' ? 'login' : 'register'
    }));
  }


  render() {
    return (
      <div className="App">
        <Nav />
        <Header />
        <Route exact path="/" render={() => (
          <>

            {this.state.currentView === 'login' && (
              <>
                <LoginForm
                  loginFormData={this.state.loginFormData}
                  handleLoginSubmit={this.handleLoginSubmit}
                  handleLoginFormChange={this.handleLoginFormChange}
                />
                <button onClick={this.toggleAuthView}>Register</button>
              </>
            )}

            {this.state.currentView === 'register' && (
              <>
                <RegisterForm
                  registerFormData={this.state.registerFormData}
                  handleRegisterSubmit={this.handleRegisterSubmit}
                  handleRegisterFormChange={this.handleRegisterFormChange}
                />
                <button onClick={this.toggleAuthView}>Login</button>
              </>
            )}

          </>
        )} />


        <Route path="/home" render={() => (
          <Home />
        )} />

        <Route path="/allrides" render={() => (
          <AllRides
            posts={this.state.posts}
          />
        )} />

        <Route path="/requestride" render={() => (
          <RideRequest
            postFormData={this.state.postFormData}
            handlePostSubmit={this.handlePostSubmit}
            handlePostFormChange={this.handlePostFormChange}
          />
        )} />

        <Route path = "/map" render = {() => (
          <MapContainer/>
        )}/>

      </div>
    );
  }
}

export default withRouter(App);
