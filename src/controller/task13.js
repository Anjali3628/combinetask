var express = require("express");
var bodyParser = require('body-parser');
// const md5 = require('md5');
const path = require("path");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
const con = require('../config/connection');

var app = express();
// app.use(cookieParser())

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


const getgenerator = async (req,res) => {
    try {

        const input = req.query.input;
        if (req.query.input) {
            var sql = `select select_id, select_type from sel_master where select_name = '${input}' `;

            con.query(sql, (err, result) => {
                if (err) console.log(err);
                else {

                    console.log(result);
                    var select_id = result[0].select_id;
                    var type = result[0].select_type;
                    sql2 = `select op_name from op_master where select_id = '${select_id}'`;
                    con.query(sql2, (err, result2) => {
                        if (err) console.log(err);
                        else {
                            console.log(result2);
                            res.render('list1', { result2, type, select_id , input });
                        }
                    })
                }
            })
        }
        else{
            res.render('list1', { input });
        }
    }
    catch (err) {
        res.send(err);
    }
};

module.exports = { getgenerator };