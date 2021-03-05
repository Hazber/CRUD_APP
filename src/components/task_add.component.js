import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import moment from 'moment';
let filecount=0;
let userId=0;
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
    this.onFileDelete = this.onFileDelete.bind(this);
   // this.deleteFile=this.deleteFile.bind(this);

    this.state = {
     
      description: "", 
      status:"None",
      file:[],
      file_list:[],
      enddate:moment(new Date).format('yyyy-MM-DD'),
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
  const f=this.state.file_list;
  nf.push(file);
  if(f.indexOf(file.name)==-1)
            f.push(file.name);
    this.setState({
    file:nf,
    file_list:f
    });
  }
  
  onFileDelete(file){

    const fl=this.state.file_list;
    const index = fl.indexOf(file);
    if (index > -1)
        fl.splice(index, 1);
    
    const f=this.state.file;
    f.splice(index-filecount, 1);
    this.setState(
      {file:f, 
      file_list: fl}
      );
  }

  saveTask() {
    
    var data = {
     
      description: this.state.description,
      status:this.state.status,
      enddate:moment(this.state.enddate).format('yyyy-MM-DD'),
      submitted:true,
      file:this.state.file,
      file_list:this.state.file_list
    };
    
    //console.log("FILE LIST"+this.state.file_list);
    // data.file.map((item,i)=>{
    //   const formData = new FormData();
    //   formData.append('file', item);
    //   TaskDataService.fileUpload(data.id,formData).
    //   then(response=>{
    //     console.log("Файл отправлен");
    //   })
    //   .catch(e=>{console.log(e)});
    // })

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
    filecount=0;
    this.setState({
        description: "", 
        status:"none",
        file:[],
        file_list:[],
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
               
            {
              this.state.file_list.map((file, index) => (
                
                <div key={index}>
                <label className={'Note__text'+(index)} >{file}</label>
                <button className="btn btn-sm btn-danger" onClick={this.onFileDelete.bind(null,file)}>Delete</button>
                </div>
                
              ))}
          
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