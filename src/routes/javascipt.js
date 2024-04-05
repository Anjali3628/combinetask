var express = require("express");
var bodyParser = require('body-parser');
const con = require('../config/connection');

const { dynamictable, events, kube, tictac, form, fetchAPIdata, fetchdetail } = require('../controller/javascript');
const js = express.Router();

js.route("/task01").get(dynamictable);
js.route("/task02").get(events);
js.route("/task03").get(kube);
js.route("/task04").get(tictac);
js.route("/task05").get(form);
js.route("/task11").get(fetchAPIdata);
js.route("/task11/:id").get(fetchdetail)


module.exports = js;