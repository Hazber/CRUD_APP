const sql = require("./dbmodel.js");


const User=function(user){
    
    this.login=user.login;
    this.password=user.password;

};


User.create = (newUser, result) => {
  
    const queryInsert = "INSERT INTO users SET ?";
    sql.query(queryInsert, newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Создан пользователь", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newTask }); 
  
    });
  };

  User.findByName = (userName, result) => {
    const queryFintbyName = `SELECT * FROM users WHERE login = '${userName}'`;
    sql.query(queryFintbyName, (err, res) => {
      if (err) {
  
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("найден юзер: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      result({ kind: "not_found" }, null);
    });
  };