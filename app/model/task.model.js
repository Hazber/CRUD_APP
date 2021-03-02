const sql = require("./dbmodel.js");


const Task = function(task) {

  this.description = task.description;
  this.enddate= task.enddate;
  this.status= task.status;
  this.file= task.file;
  
};


Task.create = (newTask, result) => {
  
  const queryInsert = "INSERT INTO todo SET ?";
  sql.query(queryInsert, newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Создана задача", { id: res.insertId, ...newTask });
    result(null, { id: res.insertId, ...newTask }); 

  });
};

Task.FileLoad=(taskId,files,result)=>{
  
  const queryUpdate = "UPDATE todo SET file = ? WHERE id = ?";
  sql.query(
    queryUpdate,
    [files, taskId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Обновлен файл у таски ", { id: taskId });
      result(null, { id: taskId });
    }
  );

}

Task.findById = (taskId, result) => {
  const queryFintbyId = `SELECT * FROM todo WHERE id = '${taskId}'`;
  sql.query(queryFintbyId, (err, res) => {
    if (err) {

      result(err, null);
      return;
    }

    if (res.length) {
      console.log("найдена задача: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};


 Task.getAll = (status,result) => {
   
  console.log("error: ", status);
  if (status !== undefined){
    queryAll = `SELECT * FROM todo WHERE status = '${status}'`;
  }else{
   queryAll = "SELECT description,status,enddate,file, id FROM todo";
  }
   
   
  sql.query(queryAll, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tasks: ", res);
    result(null, res);
  });
};

Task.updateById = (id, Task, result) => {
  const queryUpdate = "UPDATE todo SET description = ?,status = ?,enddate = ?,file = ? WHERE id = ?";
  sql.query(
    queryUpdate,
    [Task.description,Task.status,Task.enddate,Task.file, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Обновлена задача ", { id: id, ...Task });
      result(null, { id: id, ...Task });
    }
  );
};


Task.remove = (id, result) => {
  const queryDelete = "DELETE FROM todo WHERE id = ?";
  
  sql.query(queryDelete, id, (err, res) => {
    if (err) {
      console.log("error: ", err); 
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "не найдено" }, null);
      return;
    }

    console.log("Удалена задача с  ", id);
    result(null, res);
  });
};

Task.removeAll = result => {
  sql.query("DELETE FROM todo", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Tasks`);
    result(null, res);
  });
};

module.exports = Task;
