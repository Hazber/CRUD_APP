import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTask from "./components/task_add.component"
import Task from "./components/task.component"
import TasksList from "./components/tasklist.component"

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tasks" className="navbar-brand">
            TaskList
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tasks"} className="nav-link">
                Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tasks"]} component={TasksList} />
            <Route exact path="/add" component={AddTask} />
            <Route path="/tasks/:id" component={Task} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
