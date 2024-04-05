var express = require("express");
var bodyParser = require('body-parser');
const md5 = require('md5');
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const l =require('./src/routes/authentication');
const con = require('./src/config/connection');

const task06 = require('./src/routes/task06');
const task07 = require('./src/routes/task07');
const task08 = require('./src/routes/task08');
const task09 = require('./src/routes/task09');
const task10 = require('./src/routes/task10');
const task12 = require('./src/routes/task12');
const task13 = require('./src/routes/task13');
const task14 = require('./src/routes/task14');
const js = require("./src/routes/javascipt");

var app = express();
app.use(cookieParser())

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",l);
app.use("/js",js);
app.use(task06);
app.use(task07);
app.use(task08);
app.use(task09);
app.use(task10);
app.use(task12);
app.use(task13);
app.use(task14);


app.listen(3045);