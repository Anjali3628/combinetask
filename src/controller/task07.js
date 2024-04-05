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

const getpage = async (req,res) => {
    const p = req.query.page || 1;
    const limit = 150;
    const last = Math.ceil(200 / 50);
    const offset = (p - 1) * 50;

   const sql = `select e.id, s.FirstName, t.examtype_name, sum(e.ob_theory) as theory, sum(e.obt_practical)
          as practical from exam_master as e inner join STUDENT_MASTER as s on e.id = s.id
          inner join exam_type as t on e.examtype_id = t.examtype_id 
          group by t.examtype_id, s.id 
          order by e.id limit ${limit} offset ${offset}`;


    con.query(sql, (err, result) => {
        if (err) console.log(err);
        else
            console.log(result[0]);
        res.render('./table', { result });

    })
};
const getview = async (req,res) => {
    id = req.query.id;
    sql = `select s.id, s.FirstName, sub.sub_name, e.examtype_id, e.ob_theory as theory,
           e.obt_practical as practical from STUDENT_MASTER as s inner join exam_master as e on
           s.id = e.id inner join
           sub_master as sub on sub.sub_id = e.sub_id 
           where e.id = ${id}`;

    sql2 = `select count(*) as attendance from attendance_master where id = ${id} and present='p'`;
    
    
    
    con.query(sql, (err, result) => {
        if (err) console.log(err);
    
        con.query(sql2, (err, result2) => {
            if (err) console.log(err);

            res.render('./view', { result,result2 });
        })
    })
}

module.exports = { getpage, getview };