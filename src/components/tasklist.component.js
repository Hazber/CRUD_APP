import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchDescription = this.onChangeSearchDescription.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.doneTask=this.doneTask.bind(this);
    this.searchDescription = this.searchDescription.bind(this);

    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      searchDescription: ""
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

  searchDescription() {
    TaskDataService.findByDescription(this.state.searchDescription)
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

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by description"
              value={searchDescription}
              onChange={this.onChangeSearchDescription}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchDescription}
              >
                Search
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
                {currentTask.enddate}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTask.status}
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