import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import RegisterForm from './components/RegisterForm';
import AllRides from './components/AllRides';
import EditForm from './components/EditForm';
import RideRequest from './components/RideRequest';
import MyRides from './components/MyRides';
import SearchResults from './components/SearchResults';
import UserProfile from './components/UserProfile';
import User from './components/User';
import { Route, withRouter } from 'react-router-dom';
import { createPost, fetchPosts, deletePosts, updatePosts, joinRides, fetchJoinedRides, leaveRide } from './services/posts.js';
import {
  ping,
  createUser,
  loginUser,
  verifyToken,
  getUser
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
        user_id: '',
        user_name: '',
      },
      filterFormData:{
        origin: '',
        destination: '',
        date: '',
      },
      editId: null,
      posts: [],
      joinedPosts: [],
      filteredPosts: [],
      currentUser: null,
      currentUserID: null,
      currentUserName: null,
      currentUserEmail: null,
      examineUser: {
        id: null,
        name: '',
        email: ''
      },
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
    const user = await loginUser(this.state.loginFormData);
    this.setState({
      loginFormData: {
        username: '',
        password: '',
      },
      currentUser: user,
      currentUserID: user.id,
      currentUserName: user.name,
      currentUserEmail: user.email,
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
      },
      currentUser: user,
      currentUserID: user.id,
      currentUserName: user.name,
      currentUserEmail: user.email
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
      },
      currentUser: null,
      currentUserID: null,
      currentUserName: null,
      currentUserEmail: null
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
        user_id: this.state.currentUserID,
        user_name: this.state.currentUserName,
      },
    }));
    const posts = await fetchPosts();
    this.setState({
      posts: posts
    });
    const joinedPosts = await fetchJoinedRides();
    this.setState({
      joinedPosts: joinedPosts
    });

    var myRides = [];
    for (var i=0, len=joinedPosts.length; i<len; i++){
      if (joinedPosts[i].user_id === this.state.currentUserID){
        myRides.push(joinedPosts[i].post_id);
      }
    }
    for (var i=0, len=posts.length; i < len; i++){
      if (posts[i].user_id === this.state.currentUserID){
        myRides.push(posts[i].id.toString());
      }
    }

    this.setState({
      myRides:myRides
    });
    this.props.history.push('/allrides');
  } 

  // calls joinRides which tells the server to add an entry to the postgroups database
  handleJoinSubmit = async (e) => {
    e.preventDefault();
    const postId = e.target.name;
    const post = this.state.posts.find(post => post.id == postId);
    post.seats = post.seats - 1;
    await joinRides({user_id: this.state.currentUserID, post_id: postId}, post);
    this.setState(prevState => ({
      joinedPosts: prevState.posts.filter(post =>
        post.id !== parseInt(postId))
    }))
    this.props.history.push("/myrides")
  }

  // uses leaveRide to delete a specific entry from the postgroups relation
  // removes the joined ride from the joinedPosts list as well
  handleRideLeaving = async (e) => {
    console.log(this.state.currentUserID);
    const postId = this.state.joinedPosts.find(post => (post.post_id === e.target.name && post.user_id === this.state.currentUserID)).id;
    const post = this.state.posts.find(post => post.id == e.target.name);
    post.seats = post.seats + 1;
    await leaveRide(postId, post, e.target.name);
    
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
    console.log(newPost);
    const posts = await fetchPosts();
    this.setState({
      posts: posts
    });
    const joinedPosts = await fetchJoinedRides();
    this.setState({
      joinedPosts: joinedPosts
    });

    var myRides = [];
    for (var i=0, len=joinedPosts.length; i<len; i++){
      if (joinedPosts[i].user_id === this.state.currentUserID){
        myRides.push(joinedPosts[i].post_id);
      }
    }
    for (var i=0, len=posts.length; i < len; i++){
      if (posts[i].user_id === this.state.currentUserID){
        myRides.push(posts[i].id.toString());
      }
    }

    this.setState({
      myRides:myRides
    });
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
        user_id,
        user_name
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
          user_id,
          user_name
        },
        editId: id,
      };
    })
    console.log(this.state.posts);
  }

  handleFilterFormChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      filterFormData: {
        ...prevState.filterFormData,
        [name]: value
      },
    }));
  }

  handleFilterSubmit = (e) => {
    var filteredPosts = []
    for (var i=0, len=this.state.posts.length; i < len; i++){
      if ((this.state.posts[i].destination === this.state.filterFormData.destination || this.state.filterFormData.destination === '') &&
          (this.state.posts[i].origin === this.state.filterFormData.origin || this.state.filterFormData.origin === '') &&
          (this.state.posts[i].date === this.state.filterFormData.date || this.state.filterFormData.destination === '')){
        filteredPosts.push(this.state.posts[i]);
      }
    }
    this.setState({
      filterFormData:{
        origin: '',
        destination: '',
        date: '',
      },
      filteredPosts: filteredPosts
    });
    this.props.history.push("/searchresults");
  }

  handleFilterClear = (e) => {
    this.setState({
      filterFormData:{
        origin: '',
        destination: '',
        date: '',
      },
      filteredPosts: []
    });
    this.props.history.push("/allrides");
  }

  goToUserProfile = async (e) => {
    const userId = e.target.name;
    const user = await getUser(userId);
    this.setState({
      examineUser: user
    });
    this.props.history.push("/user");
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
        user_id: user.id,
        user_name: user.name
      },
        currentUser: user,
        currentUserID: user.id,
        currentUserName: user.name,
        currentUserEmail: user.email,
      })
    }
    console.log(this.state.currentUser);
    try {

    } catch (e) {
      console.log(e.message);
    }
    const posts = await fetchPosts();
    this.setState({
      posts: posts
    });
    console.log(posts);
    const joinedPosts = await fetchJoinedRides();
    this.setState({
      joinedPosts: joinedPosts
    });

    var myRides = [];
    for (var i=0, len=joinedPosts.length; i<len; i++){
      if (joinedPosts[i].user_id === this.state.currentUserID){
        myRides.push(joinedPosts[i].post_id);
      }
    }
    for (var i=0, len=posts.length; i < len; i++){
      if (posts[i].user_id === this.state.currentUserID){
        myRides.push(posts[i].id.toString());
      }
    }

    this.setState({
      myRides:myRides
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
            myRides={this.state.myRides}
            handleRideLeaving = {this.handleRideLeaving}
          />
        )} />

        <Route path="/allrides" render={() => (
          <AllRides
            posts={this.state.posts}
            currentUserID={this.state.currentUserID}
            myRides={this.state.myRides}
            handlePostDelete={this.handlePostDelete}
            showEditForm={this.showEditForm}
            handleJoinSubmit={this.handleJoinSubmit}
            filterFormData={this.state.filterFormData}
            handleFilterFormChange={this.handleFilterFormChange}
            handleFilterSubmit={this.handleFilterSubmit}
            goToUserProfile={this.goToUserProfile}
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

        <Route path="/searchresults" render={() => (
          <SearchResults
            filterFormData={this.filterFormData}
            handleFilterFormChange={this.handleFilterFormChange}
            handleFilterSubmit={this.handleFilterSubmit}
            filteredPosts={this.state.filteredPosts}
            currentUserID={this.state.currentUserID}
            filterFormData={this.state.filterFormData}
            myRides={this.state.myRides}
            handlePostDelete={this.handlePostDelete}
            showEditForm={this.showEditForm}
            handleJoinSubmit={this.handleJoinSubmit}
            handleFilterClear={this.handleFilterClear}
          />
        )} />

        <Route path="/userprofile" render={() => (
          <UserProfile
            currentUserName={this.state.currentUserName}
            joinedPosts={this.state.joinedPosts}
            myRides={this.state.myRides}
            email={this.state.currentUserEmail}
            posts={this.state.posts}
            currentUserID={this.state.currentUserID}
          />
        )} />

        <Route path="/user" render={() => (
          <User
            examineUser={this.state.examineUser}
            posts={this.state.posts}
            currentUserID={this.state.currentUserID}
          />
        )} />

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