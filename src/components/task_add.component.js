import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import moment from 'moment';

export default class AddTask extends Component {
  constructor(props) {
    super(props);
   // this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onCgangeFile = this.onChangeFile.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      //id: null,
      //title: "",
      description: "", 
      //enddate,
      status:"none",
      file:null,
     // published: false,

      submitted: false
    };
  }

 /* onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }*/

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeEndDate(e) {
    this.setState({
      enddate: e.target.value
    });
  }

  
  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }
  

  
  onChangeFile(e) {
    this.setState({
      file: e.target.value
    });
  }

  saveTask() {
    var data = {
      //title: this.state.title,
      description: this.state.description,
      status:this.state.status,
      enddate:moment(this.state.enddate).format('yyyy-MM-DD'),
      submitted:true
     // file:this.state.file
    };

    
    TaskDataService.create(data)
      .then(response => {
        this.setState({
          //id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          status:response.data.status,
          enddate:response.data.enddate,
          file:response.data.file,
         // published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e.message);
      });
  }

  newTask() {
    this.setState({
        //id: null,
        //title: "",
        description: "", 
        
        status:"none",
        //file:null,
       // published: false,
  
        submitted: false
    });
  }
//TODO: Modify date
  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newTask}>
                Add
              </button>
            </div>
          ) : (
            <div>
                
              
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="enddate">End date</label>
                <input
                  type="date"
                  className="form-control"
                  id="enddate"
                  required
                  value={this.state.enddate}
                  onChange={this.onChangeEndDate}
                  name="enddate"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select className="form-control" 
                id="status" 
                required 
                onChange={this.onChangeStatus}
                value={this.state.status}
                name="status" >
                    <option>None</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>Important</option>
                </select>
              </div>


              <div className="form-group">
                <label htmlFor="file"> Upload your files</label>
                <input type="file" className="form-control-file" id="file" onChange={this.onCgangeFile} />
              </div>


              <button onClick={this.saveTask} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}