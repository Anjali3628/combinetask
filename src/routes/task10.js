var express = require("express");
var bodyParser = require('body-parser');
const con = require('../config/connection');

const { getform, postrecord, getshow, getupdate, postupdate  } = require('../controller/task10');
// const isvaliduser = require('../middleware/token');
const ajaxform = express.Router();

ajaxform.route("/task10").get(getform);
ajaxform.route("/record").post(postrecord);
ajaxform.route("/task10/list").get(getshow);
ajaxform.route("/list/:id").get(getupdate);
ajaxform.route("/list/:id/update").post(postupdate);


module.exports = ajaxform;

