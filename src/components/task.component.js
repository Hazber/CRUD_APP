import React, { Component } from "react";
import TaskDataService from "../services/task.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    //this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEndDate=this.onChangeEndDate.bind(this);
    this.onChangeStatus=this.onChangeStatus.bind(this);
    //// this.onChangeFile=this.onChangeFile.bind(this);
    this.getTask = this.getTask.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        //title: "",
        description: "", 
        enddate:"",
        status:"none",
        file:null,
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
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
    const enddate = e.target.value;
    
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
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(""+e.message);
      });
  }

 /* updatePublished(status) {
    var data = {
      id: this.state.currentTask.id,
      title: this.state.currentTask.title,
      description: this.state.currentTask.description,
      published: status
    };

    TaskDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
*/
  updateTask() {
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
                  type="datetime-local"
                  className="form-control"
                  id="enddate"
                  value={currentTask.enddate}
                  onChange={this.onChangeEndDate}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTask.status}
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