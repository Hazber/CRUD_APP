module.exports = app => {
    const tasks = require("../controller/task.controller.js");
  
    // Создание нового дела
    app.post("/tasks", tasks.create);
  
    // Получение всех дел сразу
    app.get("/tasks", tasks.findAll);
  
    //Получение отдельного дела по id
    app.get("/tasks/:taskId", tasks.findOne);
  
    // обновить дело по id
    app.put("/tasks/:taskId", tasks.update);
  
    //Удалить дело по id
    app.delete("/tasks/:taskId", tasks.delete);
  
    // Удалить сразу все дела
    app.delete("/tasks", tasks.deleteAll);

    app.get("/tasks?description=:dEscription",tasks.findByDescription)

    //TODO: create filtering by status

  };
  