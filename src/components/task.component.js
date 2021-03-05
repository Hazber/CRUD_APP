import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import moment from 'moment';
let filecount=0;
let variable ="";
let massvariable=[];
export default class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEndDate=this.onChangeEndDate.bind(this);
    this.onChangeStatus=this.onChangeStatus.bind(this);
    this.onChangeFile=this.onChangeFile.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onFileDelete=this.onFileDelete.bind(this);
    this.onOldFileDelete=this.onOldFileDelete.bind(this);

    this.state = {
      currentTask: {
        id: null,
        description: "", 
        enddate:moment("").format('yyyy-MM-DD'),
        status:"None",
        file:[],
        oldfile:[],
        file_list:[],
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
  }
  onOldFileDelete(file){
    const fl=massvariable;
    const index = fl.indexOf(file);
    if (index > -1)
        fl.splice(index, 1);
       
  }
  onFileDelete(file){

    const fl=this.state.currentTask.file_list;
    const index = fl.indexOf(file);
    if (index > -1)
        fl.splice(index, 1);
    
    const f=this.state.currentTask.file;
    if (f.length!=0){
    f.splice(index-filecount, 1);
    }
      this.setState(function(prevState) {
        return {
          currentTask: {
            ...prevState.currentTask,
            file:f, 
            file_list: fl
      
          }
        };
      });
  }

  onChangeFile(e){
    
    const file= e.target.files[0];
    var nf=[];
    const f=this.state.currentTask.file_list;
    if(this.state.currentTask.file!=null){ 
    const nf=this.state.currentTask.file;
    
    }
    nf.push(file);
    //console.log("Name file"+f);
    if(f.indexOf(file.name)==-1)
              f.push(file.name);
    this.setState(function(prevState) {
    return {
      currentTask: {
        ...prevState.currentTask,
        file:nf,// e.target.files
        file_list:f
        
   //     file: nf
      }
    };
  });

  }
  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          description: description
        }
      };
    });
  }

  onChangeEndDate(e) {
   
    const enddate =  moment(e.target.value).format('yyyy-MM-DD');
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        enddate: enddate
      }
    }));
  }

  onChangeStatus(e) {
    const status = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        status: status
      }
    }));
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        response.data.enddate=moment(response.data.enddate).format('yyyy-MM-DD');
        response.data.file_list=[];
        if (response.data.file!=null){
        variable=response.data.file;
        //console.log("aaaaaaaaaaaaaaaaaa"+response.data.file);
        massvariable=variable.split(',');
        response.data.file=[];
        response.data.file_list=massvariable;
        }

        this.setState({
          currentTask: response.data,
        });
        
        
        
      })
      .catch(e => {
        console.log(""+e.message);
      });
  }

  updateTask() {

    if (this.state.currentTask.file!=null){
      
      //console.log( this.state.currentTask.file);
      this.state.currentTask.file.map((item,i)=>{
        const formData = new FormData();
        formData.append('file', item);
        TaskDataService.fileUpload(this.state.currentTask.id,formData).
        then(response=>{
          console.log("Файл отправлен");
        })
        .catch(e=>{console.log(e)});
      })
    }
    console.log(this.state.currentTask.file_list);
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        
        console.log(response.data);
        this.setState({
          message: "The task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
      massvariable=[];
      variable='';
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tasks')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="enddate"
                  value={moment(currentTask.enddate).format('yyyy-MM-DD')}
                  onChange={this.onChangeEndDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select className="form-control" 
                id="status" 
                required 
                onChange={this.onChangeStatus}
                value={currentTask.status}
                name="status" >
                    <option>None</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>Important</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="file" >Upload your files </label>
                <input type="file"   multiple encType="multipart/form-data" className="form-control-file" id="file" onChange={this.onChangeFile} />
                {
                //console.log(massvariable),
                currentTask.file_list.map((file, index) => (
                
                <div key={index}>
                <label className={'Note__text'+(index)} >{file}</label>
                <button className="btn btn-sm btn-danger" onClick={this.onFileDelete.bind(null,file)}>Delete</button>
                </div>
                
              ))
            } 
              </div>
            </form>

             

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTask}
            >
              Update
            </button>
            
            <p>{this.state.message}</p>
            
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
    );
  }
}