import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";
import moment from 'moment';
export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchDescription = this.onChangeSearchDescription.bind(this);
    this.onChangeSearchStatus = this.onChangeSearchStatus.bind(this);
    this.CheckColor=this.CheckColor.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.doneTask=this.doneTask.bind(this);
    this.searchStatus = this.searchStatus.bind(this);

    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      searchDescription: "",
      searchStatus:"none"
    };
  }

  componentDidMount() {
    this.retrieveTasks();
  }

  onChangeSearchDescription(e) {
    const searchDescription = e.target.value;

    this.setState({
      searchDescription: searchDescription
    });
  
 
  }

  CheckColor(task)
  {
    switch (task.status){
      case 'none':
         return '';
      break;
      case 'low':
        return 'LightBlue';
      break;
      case 'medium':
        return 'DeepSkyBlue';
      break;
      case 'important':
        return 'RoyalBlue'  
      break;

    }



  }

  onChangeSearchStatus(e){
    const searchStatus= e.target.value;
    this.setState({
      searchStatus: searchStatus
    });
  }

  retrieveTasks() {
    TaskDataService.getAll()
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTasks();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

 
  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }

  removeAllTasks() {
    TaskDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  doneTask() {
    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  searchStatus(){
   
    TaskDataService.findByStatus(this.state.searchStatus)
    .then(response => {
      this.setState({
        tasks: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
  render() {
    const { tasks, currentTask, currentIndex,searchDescription } = this.state;
<div className="form-group">
                <label htmlFor="status">Status</label>
               
              </div>
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
          <select className="form-control" 
                id="searchstatus" 
                required 
                 onChange={this.onChangeSearchStatus}
               
                name="searchstatus" >
                    <option>None</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>Important</option>
                </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchStatus}
              >
                Filter
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveTasks}
              >
                Reset filtering
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tasks List</h4>
          
          <ul className="list-group">
            {tasks &&
              tasks.map((task, index) => (
                <li
                  style={    { backgroundColor: (this.CheckColor(task)) }}
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : ""
                    )
              
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                  
                >
                  
                  {task.description}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTasks}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTask ? (
            <div>
              <h4>Task</h4>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTask.description}
              </div>
              <div>
                <label>
                  <strong>End date:</strong>
                </label>{}
                {moment(currentTask.enddate).format('yyyy-MM-DD')}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTask.status}
              </div>
              <div>
                <label>
                  <strong>Files:</strong>
                </label>{" "}
                {currentTask.file}
              </div>

              <Link
                to={"/tasks/" + currentTask.id}
                className="btn btn-info"
              >
                Edit
              </Link>
              
              <button
            className="m-3 btn btn-success"
            onClick={this.doneTask}
          >
            Done
          </button>
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Task...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}