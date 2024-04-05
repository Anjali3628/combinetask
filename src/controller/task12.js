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

const getdelimiter = async (req,res) => {
    const p = req.query.page || 1;
    var sql = `select * from STUDENT_MASTER`;

    const input = req.query.search;

    console.log(input);
    let arr = [];
    let curr = '';

    if(req.query.search){
        for (let i=0; i<input.length; i++){
            if(input[i]=='_'  || input[i] == '^' || input[i] == '$' || input[i] == '{' || input[i] == '}'){
                if(curr!=""){
                    arr.push(curr);
                    curr = "";
                }
                curr += input[i];
            }else{
                curr += input[i];
                if(i === input.length-1 || input[i+1]=== '_' || input[i+1]=== '^' ||input[i+1]=== '$' ||input[i+1]=== '{' ||input[i+1]=== '}' ){
                    arr.push(curr);
                    curr="";
                }
            }
        }
    }

    
    console.log(arr);



    var FirstName = [];
    var LastName = [];
    var address = [];
    var city = [];
    var country = [];



    arr.forEach((e) => {
        if(!sql.includes('where')) sql += ` where `;
        if(e.charAt(0) == '_') FirstName.push(`FirstName like '%${e.slice(1)}%'`);
        if(e.charAt(0) == '^') LastName.push(`LastName like '%${e.slice(1)}%'`);
        if(e.charAt(0) == '$') address.push(`address like '%${e.slice(1)}%'`);
        if(e.charAt(0) == '{') city.push(`city like '%${e.slice(1)}%'`);
        if(e.charAt(0) == '}') country.push(`country like '%${e.slice(1)}%'`);
    });


    if(FirstName.length>0) sql += FirstName.join(" OR ")+ " AND ";
    if(LastName.length>0) sql += LastName.join(" OR ")+ " AND ";
    if(address.length>0) sql += address.join(" OR ")+ " AND ";
    if(city.length>0) sql += city.join(" OR ")+ " AND ";
    if(country.length>0) sql += country.join(" OR ")+ " AND ";

    if(sql.includes('where')) sql = sql.slice(0,-4);

    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) console.log(err);
        else {
            console.log(result);
            res.render('record1', {result,input});
        }
    })
};
module.exports = { getdelimiter };
