import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import AllRides from './components/AllRides';
import RideRequest from './components/RideRequest';
import { Route, withRouter } from 'react-router-dom';
import './App.css';

class App extends React.Component {




  render() {
    return (
      <div className="App">
        <Nav />
        <Header />
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
