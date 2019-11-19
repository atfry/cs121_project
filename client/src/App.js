import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import RegisterForm from './components/RegisterForm';
import AllRides from './components/AllRides';
import EditForm from './components/EditForm';
import RideRequest from './components/RideRequest';
import MyRides from './components/MyRides';
import { Route, withRouter } from 'react-router-dom';
import { createPost, fetchPosts, deletePosts, updatePosts, joinRides, fetchJoinedRides, leaveRide } from './services/posts.js';
import {
  ping,
  createUser,
  verifyToken,
} from './services/auth';
import './App.css';
import LoginForm from './components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        driver: false,
        origin: '',
        destination: '',
        date: '',
        time: '',
        seats: '',
        stops: false,
        user_id: ''
      },
      editId: null,
      posts: [],
      joinedPosts: [],
      currentUser: null,
      currentUserID: null,
      myRides: []
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

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.getItem('authToken');
    localStorage.removeItem('authToken');
    this.setState({
      currentView: 'login',
      loginFormData: {
        name: '',
        password: '',
      }
    })
    this.props.history.push('/');
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

  handleCheckbox = (e) => {
    const { checked, name } = e.target;
    this.setState(prevState => ({
      postFormData: {
        ...prevState.postFormData,
        [name]: checked
      }
    }))
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
        stops: null,
        user_id: this.state.currentUserID
      },
    }));
    this.props.history.push('/allrides');
  } 

  // calls joinRides which tells the server to add an entry to the postgroups database
  handleJoinSubmit = async (e) => {
    e.preventDefault();
    const postId = e.target.name;
    await joinRides({user_id: this.state.currentUserID, post_id: postId});
    this.setState(prevState => ({
      joinedPosts: prevState.posts.filter(post =>
        post.id !== parseInt(postId))
    }))
    this.props.history.push("/myrides")
  }

  // uses leaveRide to delete a specific entry from the postgroups relation
  // removes the joined ride from the joinedPosts list as well
  handleRideLeaving = async (e) => {
    e.preventDefault();
    const postId = e.target.name;
    await leaveRide(postId);
    
    this.setState(prevState => ({
      joinedPosts: prevState.joinedPosts.filter(ride =>
        ride.id !== parseInt(postId))
    }))
  }

  // calls deletePosts and filters through
  // the posts in state to remove the deleted post
  handlePostDelete = async (e) => {
    e.preventDefault();
    const postId = e.target.name;
    await deletePosts(postId);

    this.setState(prevState => ({
      posts: prevState.posts.filter(post =>
        post.id !== parseInt(postId))
    }))
  }

  // calls updatePosts and maps through posts to update the post 
  // with matching id with the edited form 
  handlePostUpdate = async (ev) => {
    ev.preventDefault();
    const { editId, postFormData } = this.state;
    const newPost = await updatePosts(editId, postFormData);
    this.setState(prevState => ({
      posts: prevState.posts.map(post => post.id === editId ? newPost : post),
      editId: null,
    }))
  }


  showEditForm = (id) => {
    this.setState(prevState => {
      const item = prevState.posts.find(post => post.id === id);
      const {
        driver,
        origin,
        destination,
        date,
        time,
        seats,
        stops,
        user_id
      } = item;
      return {
        postFormData: {
          driver,
          origin,
          destination,
          date,
          time,
          seats,
          stops,
          user_id
        },
        editId: id,
      };
    })
    console.log(this.state.posts);
  }



  async componentDidMount() {
    const data = await ping();
    const user = await verifyToken();
    if (user) {
      this.setState({
        postFormData: {
        driver: false,
        origin: '',
        destination: '',
        date: '',
        time: '',
        seats: '',
        stops: false,
        user_id: user.id
      },
        currentUser: user,
        currentUserID: user.id,
      })
    }
    try {

    } catch (e) {
      console.log(e.message);
    }
    const posts = await fetchPosts();
    this.setState({
      posts: posts
    });
    const joinedPosts = await fetchJoinedRides();
    this.setState({
      joinedPosts: joinedPosts
    });
    console.log(joinedPosts);
  }

  toggleAuthView = () => {
    this.setState(prevState => ({
      currentView: prevState.currentView === 'register' ? 'login' : 'register'
    }));
  }


  render() {
    return (
      <div className="App">
        <Nav
          handleLogout={this.handleLogout}
        />
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

        <Route path="/myrides" render={() => (
          <MyRides
            posts={this.state.posts}
            currentUserID={this.state.currentUserID}
            joinedPosts={this.state.joinedPosts}
            handleRideLeaving = {this.handleRideLeaving}
          />
        )} />

        <Route path="/allrides" render={() => (
          <AllRides
            posts={this.state.posts}
            currentUserID={this.state.currentUserID}
            handlePostDelete={this.handlePostDelete}
            showEditForm={this.showEditForm}
            handleJoinSubmit={this.handleJoinSubmit}
          />
        )} />
        {this.state.editId && (
          <EditForm
            handlePostUpdate={this.handlePostUpdate}
            handleCheckbox={this.handleCheckbox}
            postFormData={this.state.postFormData}
            handlePostFormChange={this.handlePostFormChange}
          />
        )}

        <Route path="/requestride" render={() => (
          <RideRequest
            handleCheckbox={this.handleCheckbox}
            postFormData={this.state.postFormData}
            handlePostSubmit={this.handlePostSubmit}
            handlePostFormChange={this.handlePostFormChange}
          />
        )} />
      </div>
    );
  }
}

export default withRouter(App);