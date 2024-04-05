var express = require("express");
var bodyParser = require('body-parser');
const con = require('../config/connection');


const { getattendance } = require ('../controller/task08');
const attendance = express.Router();

attendance.route("/task08").get(getattendance);

module.exports = attendance;