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
        tiemNow: "",
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
                    validation: "VM is being created successfully, please wait 10 minutes and then press start VM to connect."
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
                    validation: "VM has started successfully on port "+response.data.port.toString()+".",
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
                    validation: "VM has shut down successfully ",
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
                this.setState({
                    validation: "Snapshot of name "+snapName+" created successfully.",
                    error: "",
                    snapshots: this.state.snapshots.push(snapName)
                })
            } else {
                // Error for "Incorrect username/password"
                this.setState({
                    error: "Error creating new snapshot.",
                    validation: ""
                })
            }
        })
    } else {
        this.setState({
            error: "New snapshot name already exists or isn't set.",
            validation: ""
        })
    }
  }

    render() {
        var minsRemaining = Math.floor((new Date(this.state.timeNow) - new Date(this.state.vmCreated)))
        console.log(this.state.timeNow)
        console.log(this.state.vmCreated)
        return (
            <div className="content">
            <div align="center">
            <h5>Welcome to Machine Space: {this.props.user}</h5>

            {this.state.error && <Error err={this.state.error}/>}

            {this.state.validation && <Validation msg={this.state.validation}/>}

            {!this.state.isAuthenticating && this.state.snapshots.length > 0 && <div>
            <br/>
            <h5>Your Snapshots:</h5>
            {this.state.snapshots.map((snapshot, index) => {
                return <Snapshots name={snapshot} index={index} handleAccess={this.loadSnapshot} handleDelete={this.deleteSnapshot}/>                
            })}
            </div>
            }

            {!this.state.isAuthenticating && this.state.vmCreated === "" && <div>
                    <button onClick={this.onCreateVM}>Create VM</button>
                </div>
            }
            {!this.state.isAuthenticating && minsRemaining >= 10 &&
                <div>
                    <button onClick={this.onStartVM}>Start VM</button>
                    <button onClick={this.onShutdownVM}>Shutdown VM</button>
                </div>
            }

            {!this.state.isAuthenticating && this.state.snapshots.length > 0 && <div>
                    <form onSubmit={this.onCreateSnapshot}><input type="text" onChange={this.onChangeNewSnapshot} maxlength="20" className="form-control col" id="snapshotName" placeholder="Snapshot Name"/><button type="submit">Create Snapshot</button></form>
                </div>}

            {!this.state.isAuthenticating && minsRemaining <= 10 &&
                <Validation msg={"You must wait another "+minsRemaining+" minutes since creating your VM"}/>
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
    <div>
        <p>{props.index+1}: {props.name}</p><button onClick={() => props.handleAccess(props.name)}>Load</button> <button onClick={() => props.handleDelete(props.name)}>Delete</button>
    </div>
)

const Validation = props => (
    <h6>{props.msg}</h6>
)