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

const getattendance = async (req,res) => {
    const p = req.query.page || 1;
    const offset = (p-1)*40;
    const lastpage = Math.ceil(200/40);
    const m = req.query.month || 'december2023';
    const y = m.slice(0,-4);
    console.log(m);


    sql = `select s.id, s.FirstName, monthname(a.date) as month,count(a.present)
     as presentDay from STUDENT_MASTER
           as s inner join attendance_master as a on s.id=a.id where a.present='P'
            group by id,month having month="${y}"
           order by a.id limit 40 offset ${offset}`;

    con.query(sql, function (err, result) {
        if (err) console.log (err);
        res.render('attendance', { result, p, m, lastpage});
        console.log(result);
    })
};

module.exports = { getattendance };