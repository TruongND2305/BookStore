require("dotenv").config();
const { engine } = require("express-handlebars");
const express = require("express");
const router = express.Router();
const path = require("path");
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME;
const methodOverride = require('method-override')
const sql = require('mssql')
const sqlConfig  = require('./config/db');
const cors = require('cors')
const morgan = require("morgan");

const app = express(); // app express
// conncet to db

// removal cors
app.use(cors())
// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers:{
      sum: (a,b) => a + b
    }
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources","views"));
app.use(express.static(path.join(__dirname,'/public')))
app.use(
  express.urlencoded({
    extended: true, // option cua thu vien
  })
);
app.use(express.json());
app.use(methodOverride('_method'))

sqlConfig.connect().then(function(pool) {
  app.locals.db = pool;
  const server = app.listen(port, function () {
    const host = server.address().address
    const port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
  })
}).catch(function(err) {
  console.error('Error creating connection pool', err)
});
