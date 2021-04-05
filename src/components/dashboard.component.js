import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
//import { Link } from 'react-router-dom';

//import "./css/navbar.css"
import "./css/account.css"

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        fileUpload: undefined,
        fileName: "",
        fileDescription: "",
        userFiles: null,
        error: ""
    }

    if (!this.props.state) {
        this.props.history.push('/login')  
    }

    this.onUpload = this.onUpload.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.onFileDescChange = this.onFileDescChange.bind(this)
    this.onFileNameChange = this.onFileNameChange.bind(this)
  }

  onFileChange(e) {
    this.setState({
        fileUpload: e.target.files[0]
    })
  }

  onFileNameChange(e) {
    this.setState({
        fileName: e.target.value
    })
  }

  onFileDescChange(e) {
    this.setState({
        fileDescription: e.target.value
    })
  }

  onUpload(e) {
    e.preventDefault();
        if (this.state.fileUpload !== undefined && this.state.fileName !== "" && this.state.fileDescription !== "") {
            const headers = {
                'Content-Type': 'multipart/form-data'
            }

            const formData = new FormData();
            formData.append('file',this.state.fileUpload)
            formData.append('fileName',this.state.fileName)
            formData.append('fileDesc',this.state.fileDescription)
            formData.append('user',this.props.user)

            axios.post(this.props.apiPath + '/upload', formData, headers).then((response, error) => {
                console.log(this.state)
                if (error) {
                    console.log(error)
                } else if (response.data.errorCode === 0) {
                    // Upload success 
                    this.props.addFile(response.data.name, response.data.description) 
                    this.setState({
                        error: ""
                    })
                } else {
                    // File with this name already in use
                    this.setState({
                        error: "Inputted file name is already in use."
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
            <div align="center">
            <h5>Dashboard for User: {this.props.user}</h5>
            {this.state.error && <Error err={this.state.error}/>}
            <form>
            <div className="content form-group mx-sm-3 mb-2 inputs">
                <input type="text" onChange={this.onFileNameChange} className="form-control col" id="inputFileName" placeholder="File Name"/>
            </div>

            <div className="content form-group mx-sm-3 mb-2 inputs">
                <input type="text" onChange={this.onFileDescChange} className="form-control col" id="inputFileDesc" placeholder="File Description"/>
            </div>

            <input align="center" type="file" onChange={this.onFileChange} style={{color: "white"}} /> 
                <button onClick={this.onUpload}> 
                  Upload 
                </button> 
            </form>
            <br/>
            <h5>Your Snapshots:</h5>
            {this.props.files.length > 0 && this.props.files.map((file, index) => {
                return <FileInfo name={file.name} description={file.description} index={index}/>
            })}
            <button>Create New Snapshot</button>
          </div>
          </div>
        );
    }
}

const Error = props => (
    <div className="error">{props.err}</div>
)

const FileInfo = props => (
    <h6>File #{props.index+1}: {props.name} - {props.description}</h6>
)