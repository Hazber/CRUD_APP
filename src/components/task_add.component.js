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
    this.onChangeFile = this.onChangeFile.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);
   // this.deleteFile=this.deleteFile.bind(this);

    this.state = {
     
      description: "", 
      status:"none",
      file:[],
      submitted: false
    };
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeEndDate(e) {
    this.setState({
      enddate:moment(e.target.value).format('yyyy-MM-DD')
    });
  }

  
  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }
  
  onChangeFile(e) {
  const file= e.target.files[0];
  const nf=this.state.file;
  nf.push(file);
    this.setState({
    file:nf// e.target.files
    });
  }

  //deleteFile(file){
  //  const delfile=this.state.file[0];
 //   const index = delfile.indexOf(file);
  //      delfile.splice(index, 1);
  //  this.setState({
 //     file:delfile
  //  });


  //}

  saveTask() {

    var data = {
     
      description: this.state.description,
      status:this.state.status,
      enddate:moment(this.state.enddate).format('yyyy-MM-DD'),
      submitted:true,
      file:this.state.file
    };

    console.log(data.file);
   
    TaskDataService.create(data)
      .then(response => {

        data.file.map((item,i)=>{
        const formData = new FormData();
        formData.append('file', item);
        TaskDataService.fileUpload(response.data.id,formData).
        then(response=>{
          console.log("Файл отправлен");
        })
        .catch(e=>{console.log(e)});
      })
        this.setState({
          //id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          status:response.data.status,
          enddate:moment(response.data.enddate).format('yyyy-MM-DD'),
          file:response.data.file,
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
        description: "", 
        status:"none",
        file:[],
        submitted: false
    });
  }

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
            
                <input type="file" multiple encType="multipart/form-data" name="file" className="form-control-file" id="file" onChange={this.onChangeFile} />
                <button
                className="badge badge-danger mr-2"
                //onClick={this.deleteFile(this.state.file)}
              >
              Delete file
              </button>
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