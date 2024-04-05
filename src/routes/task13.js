var express = require("express");
var bodyParser = require('body-parser');
const con = require('../config/connection');


const { getgenerator } = require ('../controller/task13');
const generator = express.Router();

generator.route("/task13").get(getgenerator);

module.exports = generator;