const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
global.appRoot = path.resolve(__dirname);

var cors = require('cors');
const multer = require('multer');


app.use(cors())

app.use(bodyParser.json());

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));




//const storageConfig = multer.diskStorage({
//  destination: (req, file, cb) =>{
//      cb(null, "uploads");
//  },
//  filename: (req, file, cb) =>{
//      cb(null, file.originalname+ "-" + Date.now());
//  }
//});

app.use(express.static(__dirname));

//app.use(multer({storage:storageConfig}).single("file"));

// app.get("/", (req, res) => {
//   res.json({ message: "Это стартовая страница нашего приложения" });
// });

require("./app/routes/task.routes.js")(app);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
