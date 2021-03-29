/*
Default Navbar that utilizes public CSS libraries imported from bootstrap in App.js
*/

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import Cookies from 'js-cookie';

import "../css/account.css"

/*
Check local storage to see if the client is logged in.
If yes, show generic info. If no, show regitration and login.
*/
export default class Navbar extends Component {
    constructor(props) {
        super(props);

        /*Send back to home if already logged in.
        if (this.props.state !== false) {
            this.props.history.push('/')
        }*/

        this.state = {
            username: "",
            password: "",
            error: ""
        }

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.username !== "" && this.state.password !== "") {
            //console.log('here')

            axios.post(this.props.apiPath + '/login', {
                username: this.state.username,
                password: this.state.password},
                {withCredentials: true
            }).then((response, error) => {
                if (error) {
                } else if (response.data.errorCode === 0) {
                    if (response.data.files != null) {
                        this.props.handleLogin(response.data.username, response.data.files)
                    } else {
                        this.props.handleLogin(response.data.username, [])
                    }
                    this.props.history.push('/')  
                } else {
                    // Error for "Incorrect username/password"
                    this.setState({
                        error: "Incorrect login credtials."
                    })
                }
            })
        } else {
            this.setState({
                error: "Some fields not filled."
            })
        }
    }


    render() {
        return (
            <div className="content">
                { this.state.error !== "" && <Error err={this.state.error}></Error>}
                <div align="center">
                    <h5>Login:</h5>
                    <form onSubmit={this.onSubmit}>
                    <div className="content form-group mx-sm-3 mb-2 inputs">
                        <input type="text" onChange={this.onChangeUsername} className="form-control col" id="inputUsername" placeholder="Username"/>
                    </div>
                    <div className="form-group mx-sm-3 mb-2 inputs">
                        <input type="password" onChange={this.onChangePassword} className="form-control col" id="inputPassword" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2 row">Login</button>
                    </form>
                </div>
                <Link to="/register">Click to Register</Link>
            </div>
        );
    }
}

const Error = props => (
    <div className="error">{props.err}</div>
)