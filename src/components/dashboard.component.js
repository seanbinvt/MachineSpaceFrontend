import React, { Component } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';

//import "./css/navbar.css"
import "./css/account.css"
import { Button } from 'bootstrap';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        newSnapshotName: "",
        deleteSnapshotName: "",
        error: "",
        validation: "",
        port: null,
        snapshots: [],
        isAuthenticating: true,
        vmCreated: "", 
        timeNow: "",
        validationStart: ""

    }

    if (!this.props.state) {
        this.props.history.push('/login')  
    }

    this.onChangeNewSnapshot = this.onChangeNewSnapshot.bind(this)
    this.onCreateSnapshot = this.onCreateSnapshot.bind(this)
    this.onCreateVM = this.onCreateVM.bind(this)
    this.onShutdownVM = this.onShutdownVM.bind(this)
    this.onStartVM = this.onStartVM.bind(this)
    this.deleteSnapshot = this.deleteSnapshot.bind(this)
    this.loadSnapshot = this.loadSnapshot.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    axios.post(this.props.apiPath + '/api/vmGetSnapshots', {
        username: this.props.user},
        {withCredentials: true
    }).then((response, error) => {
        if (error) {
        } else if (response.data.error == 5) {
            // User auth token is expired.
            this.props.handleLogout()
            this.props.history.push('/')
        } else {
            console.log(response.data.snapshots)

            if (response.data.snapshots === "[]") {
                this.setState({
                    vmCreated: response.data.vmCreated,
                    isAuthenticating: false,
                    timeNow: response.data.timeNow
                })
            } else {
            this.setState({
                snapshots: response.data.snapshots,
                vmCreated: response.data.vmCreated,
                timeNow: response.data.timeNow,
                isAuthenticating: false
            })
        }
        }
    })
  }

  onChangeNewSnapshot(e) {
    this.setState({
        newSnapshotName: e.target.value
    })
  }
  
  onCreateVM() {
        axios.post(this.props.apiPath + '/api/vmCreate', {
            username: this.props.user},
            {withCredentials: true
        }).then((response, error) => {
            if (error) {
            } else if (response.data.error === 0) {
                this.setState({
                    vmCreated: response.data.vmCreated,
                    timeNow: response.data.vmCreated,
                    error: "",
                    validation: "VM created successfully."
                })
            } else {
                // Error creating the VM. (Happens if VM is already created for that name)
                this.setState({
                    error: "Your VM is already created.",
                    validation: ""
                })
            }
        })
    }

    onStartVM() {
        axios.post(this.props.apiPath + '/api/vmStart', {
            username: this.props.user},
            {withCredentials: true
        }).then((response, error) => {
            if (error) {
            } else if (response.data.error === 0) {
                this.setState({
                    error: "",
                    validation: "",
                    validationStart: "VM has started successfully on port "+response.data.port.toString()+". Please click here then fill in your port to access.",
                    port: response.data.port 
                })
            } else {
                this.setState({
                    error: "You don't have a VM, please press Create VM.",
                    validation: ""
                })
            }
        })
    }

    onShutdownVM() {
        axios.post(this.props.apiPath + '/api/vmShutdown', {
            username: this.props.user},
            {withCredentials: true
        }).then((response, error) => {
            if (error) {
            } else if (response.data.error === 0) {
                this.setState({
                    error: "",
                    validation: "VM has shut down successfully.",
                    port: response.data.port 
                })
            } else {
                this.setState({
                    error: "Your VM is already shut down.",
                    validation: ""
                })
            }
        })
    }

    deleteSnapshot(snapshotName) {
        axios.post(this.props.apiPath + '/api/vmDeleteSnapshot', {
            username: this.props.user,
            snapshotName: snapshotName},
            {withCredentials: true
        }).then((response, error) => {
            if (error) {
            } else if (response.data.error === 0) {
                this.setState({
                    error: "",
                    validation: "Snapshot "+snapshotName+" deleted successfully.",
                    //port: response.data.port,
                    snapshots: this.state.snapshots.filter(e => e !== snapshotName)
                })
            } else {
                this.setState({
                    error: "Snapshot name doesn't exist.",
                    validation: "",
                    snapshots: this.state.snapshots.filter(e => e !== snapshotName)
                })
            }
        })
        this.setState({

        })
    }

  loadSnapshot(snapshotName) {
    axios.post(this.props.apiPath + '/api/vmLoadSnapshot', {
        username: this.props.user,
        snapshotName: snapshotName},
        {withCredentials: true
    }).then((response, error) => {
        if (error) {
        } else if (response.data.error === 0) {
            this.setState({
                error: "",
                validation: "Snapshot "+snapshotName+" loaded successfully."
            })
        } else {
            this.setState({
                error: "Error loading snapshot.",
                validation: ""
            })
        }
    })
  }

  onCreateSnapshot(e) {
    e.preventDefault();
    var snapName = this.state.newSnapshotName.replaceAll(" ", "_")
    if (this.state.newSnapshotName !== "" && !this.state.snapshots.includes(snapName)) {
        axios.post(this.props.apiPath + '/api/vmCreateSnapshot', {
            username: this.props.user,
            snapshotName: snapName},
            {withCredentials: true
        }).then((response, error) => {
            if (error) {
            } else if (response.data.error === 0) {
                var joined = this.state.snapshots.concat(snapName);
                this.setState({
                    validation: "Snapshot '"+snapName+"' created successfully.",
                    error: "",
                    snapshots: joined
                })
            } else {
                this.setState({
                    error: "Error creating new snapshot.",
                    validation: ""
                })
            }
        })
    } else {
        this.setState({
            error: "Please choose a different snapshot name.",
            validation: ""
        })
    }
  }

    render() {
        console.log(this.state.snapshots.length)
        var minsElapsed = Math.floor(((new Date(this.state.timeNow) - (new Date(this.state.vmCreated)))/60000))
        return (
            <div className="content">
            <div align="center">
            <h5>Welcome to Machine Space: {this.props.user}</h5>

            {this.state.error && <Error err={this.state.error}/>}

            {this.state.validation && <Validation msg={this.state.validation}/>}

            {this.state.validation === "" && this.state.error === "" && this.state.validationStart !== "" && 
                <ValidationStart msg={this.state.validationStart}/>
            }

            {!this.state.isAuthenticating && this.state.snapshots.length > 0 && <div>
            <br/>
            <h5>Your Snapshots:</h5>
            {this.state.snapshots.map((snapshot, index) => {
                return <div><Snapshots name={snapshot} index={index} handleAccess={this.loadSnapshot} handleDelete={this.deleteSnapshot}/><br/></div>              
            })}
            </div>
            }

            {!this.state.isAuthenticating && minsElapsed < 10 && 
                <ol style={{color: "beige"}}>
                    <li>Press "Start VM".</li>
                    <li>Complete the Ubuntu installation process.</li>
                    <li>Press the "Enter" key when prompted for a system restart.</li>
                    <li>Start your VM again to reconnect.</li>
                </ol>
            }

            {!this.state.isAuthenticating && this.state.vmCreated === "" && <div>
                    <button className={"btn-main"} onClick={this.onCreateVM}>Create VM</button>
                </div>
            }

            {!this.state.isAuthenticating && this.state.vmCreated !== "" &&
                    <button className={"btn-main"} onClick={this.onStartVM}>Start VM</button>
            }

            {!this.state.isAuthenticating && minsElapsed >= 10 && 
                <div>
                    <button className={"btn-main"} onClick={this.onShutdownVM}>Shutdown VM</button>
                    <form style={{marginTop: "10px", marginBottom: "10px", textAlign: "center"}} onSubmit={this.onCreateSnapshot}>
                        <div className={"input-group"}>
                            <input className={"form-control"} type="text" onChange={this.onChangeNewSnapshot} maxlength="20" className="form-control col" id="snapshotName" placeholder="Snapshot Name"/>
                            <span className={"input-group-btn"}>
                                <button type="submit" style={{height: "100%", marginLeft: "5px"}}>Create Snapshot</button>
                            </span>
                        </div>
                    </form>
                </div>
            }

          </div>
          </div>
        );
    }
}

const Error = props => (
    <div className="error">{props.err}</div>
)

const Snapshots = props => (
    <div className={"btn-group"}>
        <p style={{fontWeight: "bold"}}>{props.index+1}: {props.name}</p><button onClick={() => props.handleAccess(props.name)}>Load</button> <button onClick={() => props.handleDelete(props.name)}>Delete</button>
    </div>
)

const Validation = props => (
    <h6>{props.msg}</h6>
)

const ValidationStart = props => (
    <h6><a target="_blank" rel="noreferrer" href="http://machinespace.ddns.net/spice-html5/spice.html">{props.msg}</a></h6>
)