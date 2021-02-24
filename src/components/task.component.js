import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import moment from 'moment';
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

    this.state = {
      currentTask: {
        id: null,
        description: "", 
        enddate:moment("").format('yyyy-MM-DD'),
        status:"none",
        file:[],
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
  }

  onChangeFile(e){

  const file= e.target.files[0];
  console.log(file);
  const nf=this.state.currentTask.file;
 
  nf.push(file);
  this.setState(function(prevState) {
    return {
      currentTask: {
        ...prevState.currentTask,
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
        this.setState({
          currentTask: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(""+e.message);
      });
  }

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        
        this.state.currentTask.file.map((item,i)=>{
          const formData = new FormData();
          formData.append('file', item);
          TaskDataService.fileUpload(response.data.id,formData).
          then(response=>{
            console.log("Файл отправлен");
          })
          .catch(e=>{console.log(e)});
        })

        console.log(response.data);
        this.setState({
          message: "The task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
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
                <label htmlFor="file"> Upload your files</label>
                <input type="file" multiple value={currentTask.file}  className="form-control-file" id="file" onChange={this.onChangeFile} />
                <button
                className="badge badge-danger mr-2"
                onClick={this.deleteTask}
              >
              Delete file
              </button>
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