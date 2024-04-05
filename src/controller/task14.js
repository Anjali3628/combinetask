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


const getsearching = async (req,res) => {
    const p = req.query.page || 1;

    const limit = 100;
    const offset = (p - 1) * limit;
    const lastpage = Math.ceil(200 / limit);
    var query = `limit ${limit} offset ${offset}`;
    const id = req.query.id;
    const FirstName = req.query.FirstName;
    const LastName = req.query.LastName;
    const address = req.query.address;
    const city = req.query.city;
    const country = req.query.country;
    const age = req.query.age;

    const operate = req.query.operate;

    // var sql = `select * from STUDENT_MASTER`;

    if (id) {
        var sql = `select * from STUDENT_MASTER where id = ${id}`;
        console.log(sql);
    } else {


        let condition = [];

        if (FirstName) condition.push(`FirstName = '${FirstName}'`);
        if (LastName) condition.push(`LastName = '${LastName}'`);
        if (address) condition.push(`address = '${address}'`);
        if (city) condition.push(`city = '${city}'`);
        if (country) condition.push(`country = '${country}'`);
        if (age) condition.push(`age = '${age}'`);

        let where = '';
        if (condition.length > 0) {
            where = 'where ' + condition.join(` ${operate} `);
        }
        sql = `select * from STUDENT_MASTER ${where} `;
    }

    con.query(sql, (err, result) => {
        if (err) console.log(err);
        else {
            const limit = 100;
            const last = Math.ceil(200 / 100);
            res.render('record2', { result, id, FirstName, LastName, p});
        }
    })
};

module.exports = { getsearching };