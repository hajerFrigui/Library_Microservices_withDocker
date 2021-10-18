const express = require("express");


require("./src/database/db") // path db
const app = express();
//bodyParser : is a middlware for express to recive data from request
const bodyParser = require("body-parser");

const route = require("./src/router/router");

app.use(bodyParser.json());
app.use(route);

//configure bodyParser: our app peut recieve json data from requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    next();
  });
  app.listen(7777,()=>{
      console.log("this is our orders service");
  })
 
