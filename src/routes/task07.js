var express = require("express");
var bodyParser = require('body-parser');
const con = require('../config/connection');

const { getpage, getview } = require ('../controller/task07');
const attendancedetail = express.Router();

attendancedetail.route("/task07").get(getpage);
attendancedetail.route("/task07/view").get(getview);

module.exports = attendancedetail;