var express = require("express");
var bodyParser = require('body-parser');
const con = require('../config/connection');

const { getid } = require ('../controller/task9');
const searchingid = express.Router();

searchingid.route("/task09").get(getid);

module.exports = searchingid;