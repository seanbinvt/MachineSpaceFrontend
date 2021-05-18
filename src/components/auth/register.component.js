/*
Default Navbar that utilizes public CSS libraries imported from bootstrap in App.js
*/

import React, { Component } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';

import "../css/account.css"

/*
Check local storage to see if the client is logged in.
If yes, show generic info. If no, show regitration and login.
*/
export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            error: "",
            checkboxChecked: false
        }

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
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

    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    handleToggle(e) {
        this.setState({
            checkboxChecked: e.target.checked
        })
    }

    onSubmit(e) {
        console.log("submit")
        e.preventDefault();
        if (this.state.checkboxChecked && this.state.username !== "" && this.state.password !== "" && this.state.confirmPassword !== "" && this.state.password === this.state.confirmPassword) {
            axios.post(this.props.apiPath + '/api/register', {
                username: this.state.username,
                password: this.state.password
            }).then((response, error) => {
                if (error) {
                    console.log(error)
                } else if (response.data.ErrorCode === 0) {
                    // Account creation successful 
                    this.props.history.push('/login')
                } else {
                    // Error for "Username already being used"
                    this.setState({
                        error: "Username already in use."
                    })
                }
            })
        } else if (!this.state.checkboxChecked) {
            this.setState({
                error: "Please read and accept the terms of service."
            })
        } else if (this.state.username === "" || this.state.password === "" || this.state.confirmPassword === "") {
            this.setState({
                error: "Some fields not filled."
            })
        } else if (this.state.password !== this.state.confirmPassword) {
            //console.log("Password and confirm password don't match.")
            this.setState({
                error: "Password fields do not match."
            })
        }
    }

    render() {
        return (
            <div className="content">
                { this.state.error !== "" && <Error err={this.state.error}></Error>}
                <div align="center">
                    <h5>Register:</h5>
                    <form>
                    <div className="content form-group mx-sm-3 mb-2 inputs">
                        <input type="text" onChange={this.onChangeUsername} className="form-control col" id="inputUsername" placeholder="Username"/>
                    </div>
                    <div className="form-group mx-sm-3 mb-2 inputs">
                        <input type="password" onChange={this.onChangePassword} className="form-control col" id="inputPassword" placeholder="Password"/>
                    </div>
                    <div className="form-group mx-sm-3 mb-2 inputs">
                        <input type="password" onChange={this.onChangeConfirmPassword} className="form-control col" id="inputConfirmPassword" placeholder="Confirm Password"/>
                    </div>
                    </form>
                    <div>
                        <input onChange={this.handleToggle} type="checkbox" id="terms" name="terms" value="Terms"/>
                        <label style={{marginLeft: "5px"}} for="terms"><a target="_blank" rel="noreferrer" href="http://machinespace.ddns.net/terms-of-service">I have read and agree to the Machine Space terms of service.</a></label><br/>
                    </div>
                    <button onClick={this.onSubmit} type="submit" className="btn btn-primary mb-2 row">Register</button>
                </div>
            </div>
        );
    }
}

const Error = props => (
    <div className="error">{props.err}</div>
)