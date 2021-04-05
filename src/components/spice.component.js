import React, { Component } from 'react';

//import { Link } from 'react-router-dom';

//import "./css/navbar.css"
//import "./css/spice.css"

export default class Spice extends Component {
  constructor(props) {
    super(props);

    this.state = {
        port: props.match.params.port,
        ownerUsername: props.match.params.username,
    }
  }

    render() {
        return (
            <p>{this.props.match.params.username} - {this.props.match.params.port}</p>
        )
    }
}