const Task = require("../model/task.model.js");

//Создаем и сохраняем новое дело
exports.create = (req, res) => {
  //  Валидизируем запрос
  if (!req.body) {
    res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }


  // создание своего дела

  const task = new Task({
    
    description: req.body.description,
    enddate: req.body.enddate,
    status: req.body.status,
    file: req.body.file,
    
  });


  Task.create(task, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Произошла ошибка во время выполнения кода"
      });
    else res.send(data);
  });
};

// Получение всех пользователей из базы данных
exports.findAll = (req, res) => {
  Task.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Что-то случилось во время получения всех пользователей"
      });
    else 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    // я оставлю заголовки, получаемые с сервера, в таком виде, но конечно в реальном продакшене лучше переписать под конкретный origin
    // ну или вы делаете open API какой-нибудь, тогда делаете что хотите
    res.send(data);
  });
};

//  Найти одно дело по одному inner_id
exports.findOne = (req, res) => {
  Task.findById(req.params.taskId, (err, data) => {
    if (err) {
      
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Нет дела с id ${req.params.taskId}.`
        });
      } else {
        res.status(500).send({
          message: "Проблема с получением пользователя по id" + req.params.taskId
        });
      }
    } else res.send(data);
  });
};

exports.findByDescription = (req, res) => {
  Task.findByDescription(req.params.dEscription, (err, data) => {
    if (err) {
      
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Нет дела с ${req.params.dEscription}.`
        });
      } else {
        res.status(500).send({
          message: "Проблема с получением описания" + req.params.dEscription
        });
      }
    } else res.send(data);
  });
};


// Обновление пользователя по inner_id
exports.update = (req, res) => {
  // валидизируем запрос
  if (!req.body) {
    res.status(400).send({
      message: "Контент не может быть пустой"
    });
  }

// 
  Task.updateById(
    req.params.taskId,
    new Task(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Не найдено дело с id ${req.params.taskId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Task with id " + req.params.taskId
          });
        }
      } else res.send(data);
    }
  );
};

// удалить дело по inner_key
exports.delete = (req, res) => {
  Task.remove(req.params.taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Не найдено дело с ${req.params.taskId}.`
        });
      } else {
        res.status(500).send({
          message: "Не могу удалить дело с " + req.params.taskId
        });
      }
    } else res.send({ message: `дело было успешно удалено` });
  });
};

// Удалить все дела из таблицы
exports.deleteAll = (req, res) => {
  Task.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Что-то пошло не так во время удаления всех дел"
      });
    else res.send({ message: `Все дела успешно удалены` });
  });
};
