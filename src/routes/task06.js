var express = require("express");
var bodyParser = require('body-parser');
const con = require('../config/connection');

const { getsearch } = require ('../controller/task06');
const searchh = express.Router();

searchh.route("/task06").get(getsearch);

module.exports = searchh;
