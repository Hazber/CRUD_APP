const Task = require("../model/task.model.js");
const fs = require('fs-extra');
const e = require("express");
const { FileLoad } = require("../model/task.model.js");
//var file_list ='';

exports.create = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }
  console.log(req.body.file_list);

  var file_list= req.body.file_list.length==0 ? null : req.body.file_list.join();
  const task = new Task({
    
    description: req.body.description,
    enddate: req.body.enddate,
    status: req.body.status,
    file:file_list,
    
  });
  
  
  console.log(task.file);
  Task.create(task, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Произошла ошибка во время выполнения кода"
      });
    else res.status(200).send(data);
  });

  file_list='';
};


exports.FileLoad=(req,res )=>{

  if (!req.files) {
       return res.status(500).send({ msg: "file is not found" })
   }
  
   const dir=`${global.appRoot}\\public\\${req.query.taskId}`;
   if (!fs.existsSync(dir)){
     console.log("Создаем директорию");
       fs.mkdirSync(dir);
   }
  
   const myFile = req.files.file;
   console.log("myFile"+myFile);
   myFile.mv(`${dir}\\${myFile.name}`, function (err) {
       if (err) {
           console.log(err)
           return res.status(500).send({ msg: "Error occured" });
       }
       return res.status(200).send({name: myFile.name, path: `\\${myFile.name}`});
   });
};


exports.findAll = (req, res) => {
  const status = req.query.status;
  Task.getAll(status,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Что-то случилось во время получения всех тасок"
      });
    else 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
 
    res.status(200).send(data);
  });
};


exports.findOne = (req, res) => {
  Task.findById(req.params.taskId, (err, data) => {
    if (err) {
      
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Нет таски с id ${req.params.taskId}.`
        });
      } else {
        res.status(500).send({
          message: "Проблема с получением таски по id" + req.params.taskId
        });
      }
    } else res.status(200).send(data);
  });
};

exports.findByDescription = (req, res) => {
  Task.findByDescription(req.params.dEscription, (err, data) => {
    if (err) {
      
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Нет таски с ${req.params.dEscription}.`
        });
      } else {
        res.status(500).send({
          message: "Проблема с получением описания" + req.params.dEscription
        });
      }
    } else res.send(data);
  });
};


exports.update = (req, res) => {
  var filelist='';
  if (!req.body) {
    res.status(400).send({
      message: "Контент не может быть пустой"
    });
  }
  task=new Task(req.body);
  console.log("Filelist"+req.body.file_list);

  var file_list= req.body.file_list.length==0? null:req.body.file_list.join();

  task.file=file_list;
  
  Task.updateById(
    
    req.params.taskId,
    task,
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
      } else res.status(200).send(data);
    }
  );
  file_list='';
};

exports.delete = (req, res) => {
  const dir=`${global.appRoot}\\public\\${req.params.taskId}`;
  fs.remove(dir,err=>{
    console.log(err)
  })
  Task.remove(req.params.taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Не найдена таска с ${req.params.taskId}.`
        });
      } else {
        res.status(500).send({
          message: "Не могу удалить таску с " + req.params.taskId
        });
      }
    } else res.status(200).send({ message: `таска было успешно удалено` });
  });
};

exports.deleteAll = (req, res) => {
  const dir=`${global.appRoot}\\public\\`;
  fs.readdirSync(dir).map(userdir => {
    userdir=`${global.appRoot}\\public\\`+userdir;
    fs.remove(userdir);
  });
  Task.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Что-то пошло не так во время удаления всех дел"
      });
    else res.status(200).send({ message: `Все дела успешно удалены` });
  });
};
