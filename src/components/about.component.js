import React, { Component } from 'react';
//import {Helmet} from 'react-helmet';

import "./css/home.css"

export default class About extends Component {
    render() {
        return (
            <div>
                <h6>Developers:</h6>
                <br/>
                <h6>Sean Blevins</h6>
                <h6>(React Frontend, Golang Backend, & MongoDB Database)</h6>
                <h6>SeanBSoftwareDev@gmail.com</h6>
                <br/>
                <h6>Kevin Thayer</h6>
                <h6>(VM System Implementation, System Administration, & Research)</h6>
                <h6>kit10290@vtc.vsc.edu</h6>
                <br/>
                <div style={{textAlign: "center"}}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/EBVNeUtc1fE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <p>Machine Space is a website designed for the easy spin-up of Linux virtual machines
                    that allow for multiple users to view an instance at once!
                </p>
            </div>
        );
    }
}