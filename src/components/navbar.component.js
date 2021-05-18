/*
Default Navbar that utilizes public CSS libraries imported from bootstrap in App.js
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./css/navbar.css"

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.handleLogout()
    this.props.history.push('/')  
  }

    render() {
        return (
          <nav className="navbar navbar-expand-md navbar-dark">
            
          <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav nav">
              { this.props.state && 
              <li className="nav-item"> 
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li> }
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            { this.props.state && 
              <li className="nav-item">
                <a className="nav-link" target="_blank" rel="noreferrer" href="http://machinespace.ddns.net/spice-html5/spice.html">Access</a>
              </li> }
            </ul>
            { !this.props.state && 
            <ul className="navbar-nav nav ml-auto">
              <li className="nav-item dflex">
                <Link className="nav-link" to="/login"><span className="align-middle"><i className="gg-log-in" style={{float:"left"}}/></span>
                <span className="col">Login</span></Link>
              </li>
            </ul> }
            { this.props.state && 
            <ul className="navbar-nav nav ml-auto">
              <li className="nav-item dflex">
                <Link className="nav-link" onClick={this.logout}>Logout</Link>
              </li>
            </ul> }

            
          </div>
          </div>
        </nav> 
        );
    }
    /*
                <nav className="navbar navbar-expand-md navbar-dark">
            <Link className="navbar-brand" to="/">Home</Link>
          
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/account">Account</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
              </ul>
            </div>
          </nav> 
    */
}