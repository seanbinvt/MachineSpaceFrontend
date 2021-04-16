import { Component } from 'react';
//import {Helmet} from 'react-helmet';

import "./css/home.css"

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <div>
                <h4>Welcome to Machine.Space!</h4>
                {this.props.state
                ? <h5>Logged In: {this.props.state}</h5>
                : <h5>Hello user, please log in.</h5>
                    }
            </div>
        );
    }
}