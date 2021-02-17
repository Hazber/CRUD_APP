const sql = require("./dbmodel.js");


const Task = function(task) {
 // this.id = Task.id;
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
    //используем spread для отправки наших аргументов в базу данных

  });
};

//получение дела по одному inner_id
Task.findById = (taskId, result) => {
  const queryFintbyId = `SELECT * FROM todo WHERE id = '${taskId}'`;
  sql.query(queryFintbyId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("найдена задача: ", res[0]);
      result(null, res[0]);
      return;
    }
    // когда ничего не удалось найти
    result({ kind: "not_found" }, null);
  });
};


///получение дела по одному inner_id
Task.findByDescription = (description, result) => {
  const queryFintbyDescript = `SELECT * FROM todo WHERE description = '${description}'`;
  sql.query(queryFintbyDescript, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("найдена задача: ", res[0]);
      result(null, res[0]);
      return;
    }
    // когда ничего не удалось найти
    result({ kind: "not_found" }, null);
  });
};


 Task.getAll = result => {
   const queryAll = "SELECT description,status,enddate,file, id FROM todo";
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

//мы будем обновлять дела по id
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
