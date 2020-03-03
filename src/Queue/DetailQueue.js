import React, {Component, useImperativeHandle} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function DetailQueue() {
  let { id } = useParams(); //impossible with class component

  axios.get('https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db_' + id + '.json')
  .then(response => {
    console.log(response.data.objects[0]);
    
    //this.setState({job: response.data.objects[0]});
    // var mydate = new Date(response.data.objects.date);
    // var date = mydate.toString("jj/MM/yyyy");
    // console.log("date : " + date);
    // this.setState({date: date});
  });

  return(
    <div>
      <h2>Job {id}</h2>

    </div>
  );
}

export default DetailQueue;