var express = require("express");
var bodyParser = require('body-parser');
const con = require('../config/connection');


const { getsearching } = require ('../controller/task14');
const searching = express.Router();

searching.route("/task14").get(getsearching);

module.exports = searching;