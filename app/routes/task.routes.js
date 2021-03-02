module.exports = app => {
    const tasks = require("../controller/task.controller.js");
  
    app.post("/tasks", tasks.create);
  
    app.get("/tasks", tasks.findAll);
  
    app.get("/tasks/:taskId", tasks.findOne);
  
    app.put("/tasks/:taskId", tasks.update);
  
    app.delete("/tasks/:taskId", tasks.delete);
  
    app.delete("/tasks", tasks.deleteAll);
    //app.post("/tasks/file/:taskId", tasks.FileLoad);
     app.post("/tasks/file",tasks.FileLoad);
  };
  