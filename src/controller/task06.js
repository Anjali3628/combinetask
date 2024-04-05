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

const getsearch = async (req,res) => {
    try{
        const result = [];
        if(req.query.txtquery) {
            const p = req.query.page || 1;
            var sql = req.query.txtquery;

            con.query(sql, (err,result) => {
                if(err) console.log(err);
                else{
                    const limit = 30;
                    const lastpage = Math.ceil(result.length/limit);
                    const offset = (Number(p) - 1)* limit;
                    if(sql.includes('limit')){
                        const key = Object.keys(result[0]);
                        res.render('data',{ result, key, sql, p, lastpage });
                    }else{
                    var sql2 = sql + ` limit ${limit} offset ${offset}`;
                    console.log(sql2);
                    const key = Object.keys(result[0]);
                    con.query(sql2,(err,result)=>{
                        if(err) console.log(err);
                        else
                        res.render('data', { result, key, sql, sql2, p, lastpage });
                    })
                }
            }
            })
        }else{
            res.render('data', { result });
        }
        
    }catch(err){
        console.log(err);
    }
};

module.exports = { getsearch };