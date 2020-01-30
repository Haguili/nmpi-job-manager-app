import React, {Component, useImperativeHandle} from 'react';
import axios from 'axios';
//import 'react-icons/fa';
import {MdSearch, MdAddCircle} from 'react-icons/md';

import { 
    BrowserRouter as Router,
    Switch,
    Route, 
    Link } from "react-router-dom";

class ListQueue extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      jobs: [],
      error: '',
    }
    //console.log("job.code : " + this.state.jobs.code);
  }
  componentDidMount(){
    axios.get('https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db.json')
    .then(response => {
      console.log(response);
      this.setState({jobs: response.data.objects});
      var mydate = new Date(response.data.objects.date);
      var date = mydate.toString("jj/MM/yyyy");
      console.log("date : " + date);
      this.setState({date: date});
  
    })
    .catch(error => {
      console.log(error)
      this.setState({errorMsg: 'Error retreiving data'})
    })
  }


  render() {
    //const { jobs } = this.state
    return (
      <div>
        <h2>List Queue of jobs</h2>
        <div className="row-fluid">
          <div className="col-md-12">
            <table className="table table-striped table-condensed">
              <thead>
                  <tr>
                      <th>
                          <a aria-hidden="true" href="/addjob" ><MdAddCircle /></a>
                          <a aria-hidden="true" href="" onClick="alert('You have to be within an HBP Collaboratory to submit a new job.')"></a>
                      </th>
                      <th>ID</th>
                      <th>Status</th>
                      <th>System</th>
                      <th>Code</th>
                      <th ng-show="!with_ctx">Collab</th>
                      <th>Submitted on</th>
                      <th>Submitted by</th>
                  </tr>
              </thead>
              <tbody>
                {
                  this.state.jobs.map(job => 
                  <tr>
                    <td><a aria-hidden="true" href="" ><MdSearch /></a></td>
                    <td>{job.collab_id}</td>
                    <td><span className={job.status == 'finished' ? 'badge badge-success' : 'badge badge-danger'}>{job.status}</span></td>
                    <td>{job.hardware_platform}</td>
                    <td><code>{job.code.substring(0,77) + "..."}</code></td>
                    <td>{job.collab}</td>
                    <td>{job.timestamp_submission}</td>
                    <td>{job.user}</td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  };
}



export default ListQueue;