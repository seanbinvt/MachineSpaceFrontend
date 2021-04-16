import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css" // Public CSS framework available for use for quick frontend styling

import "./App.css"

import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import Login from "./components/auth/login.component"
import Register from "./components/auth/register.component"
import Dashboard from "./components/dashboard.component"
import About from "./components/about.component"
import Cookies from 'js-cookie'
import Spice from "./components/spice.component"
//import {decode} from 'base-64'
//import { findByLabelText } from '@testing-library/react'

export default class App extends Component {
  constructor() {
    super();
    
    this.state = {
      state: Cookies.get('session') || false,
      user: Cookies.get('username') || "",
      snapshots: JSON.stringify(Cookies.get('snapshots').replace(/\s/g, '')) || [],
      API_ENDPOINT: process.env.REACT_APP_API_PATH
    }

    this.setState({test:true})
    //console.log("APP THIS", this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.addSnapshot = this.addSnapshot.bind(this)
  }

  handleLogout() {
    Cookies.remove("session", { path: '/', domain: ".machinespace.ddns.net" })
    Cookies.remove("username", { path: '/', domain: ".machinespace.ddns.net" })
    Cookies.remove("snapshots", { path: '/', domain: ".machinespace.ddns.net" })
    this.setState({
      state: false,
      user: "",
      snapshots: []
    });
    //localStorage.removeItem('LoggedIn')
    //localStorage.removeItem('User')
  }

  addSnapshot(snapshots, name) {
    this.setState({
      snapshots: "["+snapshots.toString()+name+"]"
    })
  }

  handleLogin(username, snapshots) {
    this.setState({
      user: username,
      state: Cookies.get('session'),
      snapshots: snapshots
    })
    //localStorage.setItem("User", username)
    //localStorage.setItem("LoggedIn", true)
    //console.log(this.state.user)
  }

  render() {
    return (
      <Router>
        <div className="container">
        <Route path="/" render={props => (
            <Navbar {... props} state={this.state.state} user={this.state.user} handleLogout={this.handleLogout}/>
          )}/>
          <br />
          <Route exact path="/" render={props => (
            <Home {... props} state={this.state.state} />
          )}/>

          {/* Routes that require to NOT be logged in */}
          { this.state.state === false  &&
          <Route exact path="/login" render={props => (
            <Login {... props} handleLogin={this.handleLogin} state={this.state.state} apiPath={this.state.API_ENDPOINT} />
          )}/>
          }

          { this.state.state === false &&
          <Route exact path="/register" render={props => (
            <Register {... props} handleLogin={this.handleLogin} state={this.state.state} apiPath={this.state.API_ENDPOINT} />
          )}/>
          }

          {/* Routes that require to be logged in */}
          { this.state.state !== false &&
          <Route exact path="/dashboard" render={props => (
            <Dashboard {... props} state={this.state.state} snapshots={this.state.snapshots.substring(2, this.state.snapshots.length-2).split(",")} addSnapshot={this.addSnapshot}
            user={this.state.user} apiPath={this.state.API_ENDPOINT} />
          )}/>
          }

          { this.state.state !== false &&
          <Route exact path="/vm/:username/:port" render={props => (
            <Spice {... props} state={this.state.state} user={this.state.user} apiPath={this.state.API_ENDPOINT} />
          )}/>
          }

          <Route exact path="/about" component={About}/>
          {/*<Route path="/battlepaste/:server/:id" exact component={ViewBattlePaste} />*/}
        </div>
      </Router>
    );
  }
}

// /        <Route path="/country/:country/:information" exact component={CountryInfo} />

/*
        <Route path="/battlepaste/:server/:id" exact component={ViewBattlePaste} />
                <Route path="/battlepaste" component={BattlePaste} />
*/