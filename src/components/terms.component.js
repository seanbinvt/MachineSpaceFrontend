import React, { Component } from 'react';

import "./css/home.css"

export default class Terms extends Component {
    render() {
        return (
            <div>
                <h4 style={{color: "beige"}}>Machine Space Terms of Service:</h4>
            <ul style={{textAlign: "center", color: "white", fontWeight: "bold"}}>
                <li>Do not use the machines to break any laws.</li>
                <li>Do not connect to another users machine without their permission.</li>
                <li>Do not edit your machine in such a way to disrupt the regular operation of the server.</li>
                <li>Contact owners regarding any problems/concerns.</li>
                <li>Owners are not responsible for damages caused in the case of unexpected downtimes.</li>
            </ul>
            </div>
        );
    }
}