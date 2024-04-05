var express = require("express");
var bodyParser = require('body-parser');
const con = require('../config/connection');

const { getdelimiter } = require ('../controller/task12');
const delimiter = express.Router();

delimiter.route("/task12").get(getdelimiter);

module.exports = delimiter;