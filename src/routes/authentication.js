var express = require("express");
var bodyParser = require('body-parser');
const {getinsert, postinsert, getpassword, postpassword, getlogin, postlogin, getwelcome, getforgot, postforgot } = require('../controller/authentication');
const con = require('../config/connection');
const login = express.Router();

login.route("/").get(getinsert);
login.route("/insert").post(postinsert)
// login.route("/insert").post(postinsert);
login.route("/accesskey").post(postinsert);
login.route("/password").get(getpassword).post(postpassword);
login.route("/login").get(getlogin).post(postlogin);
login.route("/welcome1").get(getwelcome);
login.route("/forgotpass").get(getforgot).post(postforgot);


module.exports = login;
