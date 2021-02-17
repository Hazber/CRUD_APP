const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var cors = require('cors')
//const multer = require('multer')

app.use(cors())
//делаем наш парсинг в формате json
app.use(bodyParser.json());

// парсит запросы  по типу: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//  простой response - request
app.get("/", (req, res) => {
  res.json({ message: "Это стартовая страница нашего приложения" });
});


require("./app/routes/task.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
