const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
  
 
  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });
  
  
  connection.connect(err => {
    if (err) {
      console.error("Ошибка"+err.message);
    }
    else{
    console.log("успешно соединено с базой данных");
    }
    });

  module.exports = connection;
   