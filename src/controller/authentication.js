var express = require("express");
var bodyParser = require('body-parser');
const md5 = require('md5');
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const con = require('../config/connection');

var app = express();
app.use(cookieParser())

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function random(n) {
    let salt = '';
    for (let i = 0; i < n; i++) {
        salt += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return salt;
}

const getinsert = async (req, res) => {
    {
        res.render("form");
    }
};

const postinsert = async (req, res) => {
    try {

        var { firstname, lastname, contact, email } = req.body;
        sql = 'insert into `registration` (`firstname`, `lastname`, `contactno`, `emailid`, `salt`, `access_key`) VALUES (?, ?, ?, ?, ?, ?)';
        data = await con.promise().query(sql, [firstname, lastname, contact, email, random(4), random(12)]);
        id = data[0].insertId;

        data = await con.promise().query(`select * from registration where id = ${id}`);
        result = data[0][0];
        res.render("accesskey", { result });
    }
    catch (err) {
        res.send(err);
    }
};

const getpassword = async (req, res) => {
    try {
        var id = req.query.id;
        data = await con.promise().query(`select * from registration where id = ${id}`);
        result = data[0][0];

        var difference = new Date().valueOf() - result.created_at.valueOf();
        // var datete = result.created_at.valueOf();
        // console.log(datete);
        var min = Math.floor(difference / 1000);
        // console.log(min);

        // let accesskey = req.query.accesskey;
        res.render("password", { result, min });;
    } catch (err) {
        res.send(err);
    }
};

const postpassword = async (req, res) => {
    try {
        var { salt, id, accesskey, password, retype_password } = req.body;
        if (password === retype_password) {
            // console.log(salt);
            password = password + salt;
            let md5password = md5(password);
            sql2 = `update registration set password1 = ? where id = ? and access_key = ? `;
            // console.log(sql2);
            // console.log(md5password);
            await con.promise().query(sql2, [md5password, id, accesskey]);
            res.json({ msg: "hello" });
        } else {
            res.json({ msg: "err" });
        }
    } catch (err) {
        res.send(err);
    }
};


const getlogin = async (req, res) => {
    {
        res.render("login");
    }
}

const postlogin = async (req, res) => {
    try {
        var { email, password } = req.body;
        console.log(email);
        sql = `select * from registration where emailid = ?`;
        data = await con.promise().query(sql, [email]);
        result = data[0][0];
        console.log(result.salt);
        if (data[0].length === 0) {
            res.json({ msg: "email or password wrong" });
        }
        else{
            let md5pass = md5(password + result.salt);
            console.log(md5pass);
            console.log(result.password1);
            if (result.password1 === md5pass) {
                const token = jwt.sign({ email }, `md5password`, { expiresIn: '1h' });
                console.log(token);
                res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
                res.json({ msg: "welcome2" });
                // else {
                //     return res.redirect("/login");
                // }
            } else {
                res.json({ msg: "email or password wrong" });
            }
        }
    }
    catch (err) {
        res.send(err);
    }
};

const getwelcome = async (req, res) => {
    
        res.render('welcome1');
    
};

const getforgot = async (req, res) => {
    {
        res.render("forgotpass");
    }
}

const postforgot = async (req, res) => {
    var { emailid } = req.body;
    console.log(req.body);
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function random(n) {
        let salt = '';
        for (let i = 0; i < n; i++) {
            salt += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return salt;
    }
    // sql = `update registration set access_key = ?, salt = ? where emailid = ? `;
    // data = await con.promise().query(sql, [random(4), random(12),emailid]);
    sql1 = `select * from registration where emailid  = ?`;
    data6 = await con.promise().query(sql1, [emailid]);
    result = data6[0][0];
    console.log(result);
    // res.render('link', { result });
    // var sql= `select * from registration where emailid =?`;
    // data=await con.promise().query(sql,[emailid]);
    // result = data[0][0];
    // console.log(result);
    res.render('link', { result });
    // res.render("forgotpass");
};

module.exports = { getinsert, postinsert, getpassword, postpassword, getlogin, postlogin, getwelcome, getforgot, postforgot }


