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

const getid = async (req,res) => {
    const p = req.query.page || 1;
    console.log(p);
    const limit = 200;
    const order = req.query.sort || 'asc';
    const order_by = req.query.select || 'id';
    const offset = (p-1)*limit;
    const lastpage = Math.ceil(50000/limit);

    const sortorder = req.query.sort === 'desc' ? 'desc' : 'asc';
    const sortcolumn = req.query.select || 'id' || 'FirstName' ;
    
    var sql = `select * from student_MASTER ORDER BY ${order_by} ${order} limit ${limit} offset ${offset}`;

    con.query(sql,function(err,result){
        if(err) throw err;
        res.render('record' ,{result , p, order_by, order, lastpage, sortorder, sortcolumn});
        console.log(result);
    })
}

module.exports = { getid };