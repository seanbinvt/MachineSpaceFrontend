import React, { Component } from 'react';
//import {Helmet} from 'react-helmet';

import "./css/home.css"

export default class About extends Component {
    render() {
        return (
            <div>
                { 
                //could use this to diplay it<iframe src="http://machinespace.ddns.net/spice-html5/spice_auto.html" title="VM Viewer"></iframe> 
                }
                <h6>Developers:</h6>
                <br/>
                <h6>Sean Blevins</h6>
                <h6>(React Frontend, Golang Backend, & MongoDB Database)</h6>
                <h6>SeanBSoftwareDev@gmail.com</h6>
                <br/>
                <h6>Kevin Thayer</h6>
                <h6>(VM System Implementation & Research)</h6>
                <h6>kit10290@vtc.vsc.edu</h6>
                <br/>
                <p>Machine Space is a website designed for the easy spin-up of Linux virtual machines
                    that allow for multiple users to view an instance at once!
                </p>
            </div>
        );
    }
}