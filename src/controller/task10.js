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


const getform = async (req,res) => {
    {
        res.render('list');
    }
};

const postrecord = async (req,res) => {
    var { firstname, lastname, designation1, email, address_1, address_2, no, City, state, Gender, Zipcode,
        relationshipStatus, date, employee_id,
        edutype, board1, passingyear1, percentage1,
        company1, designation, fromdate, todate, ref_id, name1, contact,
        relation, employee_id, location, period, expected, current, hindi, readh, writeh, speakh, english, reade, writee,
        speake, gujarati, readg, writeg, speakg, php, mySQL, laravel, oracle, tech_php, tech_mySQL, tech_laravel,
        tech_oracle } = req.body;
// console.log(req.body);

    console.log(oracle);

    var sql = `select o.id,s.sel_id, o.op_key from select_master as s 
    inner join Option_Master  as o on s.sel_id = o.op_id`;
    let result = await con.promise().query(sql);

    console.log(result[0]);
    result[0].forEach(e => {

        if (e.op_key === 'hindi' && hindi == "on") hindi = e.id;
        if (e.op_key === 'english' && english == "on") english = e.id;
        if (e.op_key === 'gujarati' && gujarati == "on") gujarati = e.id;

        if (e.op_key === 'php' && php == "on") php = e.id;
        if (e.op_key === 'mySQL' && mySQL == "on") mySQL = e.id;
        if (e.op_key === 'laravel' && laravel == "on") laravel = e.id;
        if (e.op_key === 'oracle' && oracle == "on") oracle = e.id;

        if (e.op_key == 'beginer' && tech_php == "beginer") tech_php = e.id;
        if (e.op_key == 'mediator' && tech_php == "mediator") tech_php = e.id;
        if (e.op_key == 'expert' && tech_php == "expert") tech_php = e.id;

        if (e.op_key == 'beginer' && tech_mySQL == "beginer") tech_mySQL = e.id;
        if (e.op_key == 'mediator' && tech_mySQL == "mediator") tech_mySQL = e.id;
        if (e.op_key == 'expert' && tech_mySQL == "expert") tech_mySQL = e.id;

        if (e.op_key == 'beginer' && tech_laravel == "beginer") tech_laravel = e.id;
        if (e.op_key == 'mediator"' && tech_laravel == "mediator") tech_laravel = e.id;
        if (e.op_key == 'expert' && tech_laravel == "expert") tech_laravel = e.id;

        if (e.op_key == 'beginer' && tech_oracle == "beginer") tech_oracle = e.id;
        if (e.op_key == 'mediator' && tech_oracle == "mediator") tech_oracle = e.id;
        if (e.op_key == 'expert' && tech_oracle == "expert") tech_oracle = e.id;
       
    })

    // console.log(hindi);
    //     console.log(english);
    //     console.log(gujarati);

    //     console.log(php);
    //     console.log(req.body);
    //     console.log(mySQL);
    //     console.log(laravel);
       console.log(oracle);



    console.log("hello");
    var employee_id = 0;
    var sql1 = 'INSERT INTO `BasicDetail` (`FirstName`, `LastName`, `Designation`, `email`, `address1`, `address2`, `ContactNo`, `city`, `state`, `gender`, `zipcode`, `relationshipStatus`, `DateOfBirth`) VALUES (?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var basic = await con.promise().query(sql1, [firstname, lastname, designation1, email, address_1, address_2, no, City, state, Gender, Zipcode, relationshipStatus, date]);

    console.log(basic);
    var employee_id = basic[0].insertId;
    console.log(employee_id);



    console.log("hello world");

    var sql2 =
        'INSERT INTO Experience (`exp_id`, `CompanyName`, `Designation`, `Fromdate`, `todate`) VALUES (?,?,?,?,?)';
    for (let i = 0; i < company1.length; i++) {
        var work = await con.promise().query(sql2, [employee_id, company1[i], designation[i], fromdate[i], todate[i]]);
    }
    console.log(company1);

    //     var ref_id = 0;
    var sql3 =
        'INSERT INTO `ReferenceContact` (`ref_id`,`name`,`ContactNo`,`Relation`) values (?,?,?,?)';
    // console.log(name1);
    for (let i = 0; i < name1.length; i++) {
        var reference = await con.promise().query(sql3, [employee_id, name1[i], contact[i], relation[i]]);

    }



    var sql4 =
        'INSERT INTO `Preferances`(`pre_id`,`PreferedLocation`,`NoticePeriod`,`ExpectedCTC`,`CurrentCTC`) values (?,?,?,?,?)';
    for (let i = 0; i < location.length; i++) {
        var preference = await con.promise().query(sql4, [employee_id, location[i], period[i], expected[i], current[i]]);
    }





    var sql5 =
        'INSERT INTO `languages`(`eid`,`l_id`,`r`,`w`,`s`) VALUES(?,?,?,?,?)';
    if (hindi) {
        if (readh == "on") { readh = 1 }
        else { readh = 0 }
        if (writeh == "on") { writeh = 1 }
        else { writeh = 0 }
        if (speakh == "on") { speakh = 1 }
        else { speakh = 0 }
        console.log(hindi);
        await con.promise().query(sql5, [employee_id, hindi, readh, writeh, speakh]);
    }
    if (english) {
        if (reade == "on") { reade = 1 }
        else { reade = 0 }
        if (writee == "on") { writee = 1 }
        else { writee = 0 }
        if (speake == "on") { speake = 1 }
        else { speake = 0 }
        await con.promise().query(sql5, [employee_id, english, reade, writee, speake]);
    }
    if (gujarati) {
        if (readg == "on") { readg = 1 }
        else { readg = 0 }
        if (writeg == "on") { writeg = 1 }
        else { writeg = 0 }
        if (speakg == "on") { speakg = 1 }
        else { speakg = 0 }
        await con.promise().query(sql5, [employee_id, gujarati, readg, writeg, speakg]);
    }



    var sql6 =
        'INSERT INTO `technology`(`id`,`tech_id`,`tech_level`) VALUES(?,?,?) ';
    if (php) await con.promise().query(sql6, [employee_id, php, tech_php]);
    if (mySQL) await con.promise().query(sql6, [employee_id, mySQL, tech_mySQL]);
    if (laravel) await con.promise().query(sql6, [employee_id, laravel, tech_laravel]);
    if (oracle) await con.promise().query(sql6, [employee_id, oracle, tech_oracle]);




    var sql7 =
        'INSERT INTO `education` (`edu_id`, `edu_type`, `boardname`, `percentage`, `passingyear`) VALUES (?, ?, ?, ?, ?)';
    for (let i = 0; i < edutype.length; i++) {
        await con.promise().query(sql7, [employee_id, edutype[i], board1[i], passingyear1[i], percentage1[i]])
    }

    // sql1 = `select * from BasicDetail where id = ${employee_id}`;
    // //  sql1 = `select * from BasicDetail where id = 1`;

    // con.query(sql1, (err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         res.render('record', { result })
    //     }
    // })

};

const getshow = async (req,res) => {
    sql1 = `select * from BasicDetail`;
    // //  sql1 = `select * from BasicDetail where id = 1`;

    con.query(sql1, (err, result) => {
        if (err) console.log(err);
        else {
            res.render('record3', { result })
        }
    })
};

const getupdate = async (req,res) => {
    console.log("hello");
    // var { firstname, lastname, designation1, email, address_1, address_2, no, City, state, Gender, Zipcode, 
    //     relationshipStatus, date,
    //  employee_id ,
    //     edutype, board1, passingyear1, percentage1  ,
    //     company1, designation, fromdate, todate, 
    //     ref_id, name1, contact, relation, 
    //     employee_id, location, period, expected, current,
    //     hindi, readh, writeh, speakh, english, reade, writee, speake, gujarati, readg, writeg, speakg,     
    //     php, mySQL, laravel, oracle, tech_php, tech_mySQL, tech_laravel,  tech_oracle 
    //    } = req.query

    sql1 = `select * from BasicDetail where id = ${req.params.id}`;
    data1 = await con.promise().query(sql1);
    result1 = data1[0][0];
    console.log(result1);

    sql7 = `select * from education where edu_id = ${req.params.id}`;
    data7 = await con.promise().query(sql7);
    result7 = data7[0];
    console.log(result7);





    sql2 = `select * from Experience where exp_id = ${req.params.id}`;
    sql3 = `select * from ReferenceContact where ref_id = ${req.params.id}`;
    sql4 = `select * from Preferances where pre_id = ${req.params.id}`;



    hindi = [], english = [], gujarati = [];
    sql5 = `select * from languages where l_id = ${req.params.id}`;
    data5 = await con.promise().query(sql5);
    result5 = data5[0];
    result5.forEach(e => {
        if (e.l_id === 7) hindi.push(e);
        if (e.l_id === 8) english.push(e);
        if (e.l_id === 9) gujarati.push(e);
    })


    php = [], mySQL = [], laravel = [], oracle = [];
    sql6 = `select * from technology where tech_id = ${req.params.id}`;
    data6 = await con.promise().query(sql6);
    result6 = data6[0];
    result6.forEach(e => {
        if (e.tech_id === 10) php.push(e);
        if (e.tech_id === 11) mySQL.push(e);
        if (e.tech_id === 12) laravel.push(e);
        if (e.tech_id === 13) oracle.push(e);
    })




    data2 = await con.promise().query(sql2);
    data3 = await con.promise().query(sql3);
    data4 = await con.promise().query(sql4);



    result2 = data2[0];
    result3 = data3[0];
    result4 = data4[0];


    res.render("detail", { result1, result7, result2, result3, result4 })

};

const postupdate = async (req,res) => {
    console.log("Hello");
    // console.log(req.body);
    var { firstname, lastname, designation1, email, address_1, address_2, no, City, state, Gender, Zipcode, relationshipStatus, date } = req.body;
    var { edutype, board1, passingyear1, percentage1,educationid } = req.body;
    var { company1, designation, fromdate, todate } = req.body;
    var { name1, contact, relation } = req.body;
    var { hindi, readh, writeh, speakh, english, reade, writee, speake, gujarati, readg, writeg, speakg } = req.body;
    var { php, mySQL, laravel, oracle, tech_php, tech_mySQL, tech_laravel, tech_oracle } = req.body;
    var { location, period, expected, current } = req.body;



    var sql = `select o.id,s.sel_id, o.op_key from select_master as s 
    inner join Option_Master  as o on s.sel_id = o.op_id`;
    let result10 = await con.promise().query(sql);
    
   
    result10[0].forEach(e => {

        if (e.op_key === 'hindi' && hindi == "on") hindi = e.id;
        if (e.op_key === 'english' && english == "on") english = e.id;
        if (e.op_key === 'gujarati' && gujarati == "on") gujarati = e.id;

        if (e.op_key === 'php' && php == "on") php = e.id;
        if (e.op_key === 'mySQL' && mySQL == "on") mySQL = e.id;
        if (e.op_key === 'laravel' && laravel == "on") laravel = e.id;
        if (e.op_key === 'oracle' && oracle == "on") oracle = e.id;

        if (e.op_key == 'beginer' && tech_php == "beginer") tech_php = e.id;
        if (e.op_key == 'mediator' && tech_php == "mediator") tech_php = e.id;
        if (e.op_key == 'expert' && tech_php == "expert") tech_php = e.id;

        if (e.op_key == 'beginer' && tech_mySQL == "beginer") tech_mySQL = e.id;
        if (e.op_key == 'mediator' && tech_mySQL == "mediator") tech_mySQL = e.id;
        if (e.op_key == 'expert' && tech_mySQL == "expert") tech_mySQL = e.id;

        if (e.op_key == 'beginer' && tech_laravel == "beginer") tech_laravel = e.id;
        if (e.op_key == 'mediator"' && tech_laravel == "mediator") tech_laravel = e.id;
        if (e.op_key == 'expert' && tech_laravel == "expert") tech_laravel = e.id;

        if (e.op_key == 'beginer' && tech_oracle == "beginer") tech_oracle = e.id;
        if (e.op_key == 'mediator' && tech_oracle == "mediator") tech_oracle = e.id;
        if (e.op_key == 'expert' && tech_oracle == "expert") tech_oracle = e.id;
       
    })

   
    sql1 = `update BasicDetail set FirstName = ?, LastName = ?, Designation = ?, email = ?, address1 = ?, address2 = ?, ContactNo = ?, city = ?, state = ?, gender = ?, zipcode = ?, relationshipStatus = ?, DateOfBirth = ? where id = ${req.params.id} `;
    result1 = await con.promise().query(sql1, [firstname, lastname, designation1, email, address_1, address_2, no, City, state, Gender, Zipcode, relationshipStatus, date])

    // console.log(result);
    res.send("updated data");

   
    sql7 = `update education set  edu_type = ?, boardname = ?, percentage = ?, passingyear = ? where edu_id = ${req.params.id} AND eid = ? `;
    for (let i = 0; i < edutype.length; i++) {
        await con.promise().query(sql7, [edutype[i], board1[i],  percentage1[i],passingyear1[i],educationid[i]])
    }

    
    sql2 = `update Experience set CompanyName = ?, Designation = ?, Fromdate = ?, todate = ? where exp_id = ${req.params.id} `;
    if (company1) {
        for (let i = 0; i < company1.length; i++) {
            var work = await con.promise().query(sql2, [ company1[i], designation[i], fromdate[i], todate[i]]);
        }
    }
    // console.log(company1);

    var sql3 = `update ReferenceContact set name = ?,ContactNo = ?,Relation = ? where ref_id = ${req.params.id} `;
    if (name1) {
        for (let i = 0; i < name1.length; i++) {
            var reference = await con.promise().query(sql3, [ name1[i], contact[i], relation[i]]);
        }
    }

    var sql = `select o.id,s.sel_id, o.op_key from select_master as s 
            inner join Option_Master  as o on s.sel_id = o.op_id`;
    let result = await con.promise().query(sql);


    // console.log(result[0]);
    result[0].forEach(e => {

        if (e.op_key === 'hindi' && hindi == "on") hindi = e.id;
        if (e.op_key === 'english' && english == "on") english = e.id;
        if (e.op_key === 'gujarati' && gujarati == "on") gujarati = e.id;

    })

    sql5 = `update languages set l_id = ?,r = ?,w = ?,s= ? where l_id = ${req.params.id} and id = ?`
    if (hindi) {
        if (readh == "on") { readh = 1 }
        else { readh = 0 }
        if (writeh == "on") { writeh = 1 }
        else { writeh = 0 }
        if (speakh == "on") { speakh = 1 }
        else { speakh = 0 }
        console.log(hindi);
        await con.promise().query(sql5, [7, hindi, readh, writeh, speakh]);
    }
    if (english) {
        if (reade == "on") { reade = 1 }
        else { reade = 0 }
        if (writee == "on") { writee = 1 }
        else { writee = 0 }
        if (speake == "on") { speake = 1 }
        else { speake = 0 }
        await con.promise().query(sql5, [8, english, reade, writee, speake]);
    }
    if (gujarati) {
        if (readg == "on") { readg = 1 }
        else { readg = 0 }
        if (writeg == "on") { writeg = 1 }
        else { writeg = 0 }
        if (speakg == "on") { speakg = 1 }
        else { speakg = 0 }
        await con.promise().query(sql5, [9, gujarati, readg, writeg, speakg]);
    }


    console.log(req.body)
    sql6 = `update technology set tech_id=?, tech_level = ? where id = ${req.params.id} `
    if (php) await con.promise().query(sql6, [ php, tech_php]);
    if (mySQL) await con.promise().query(sql6, [ mySQL, tech_mySQL]);
    if (laravel) await con.promise().query(sql6, [ laravel, tech_laravel]);
    if (oracle) await con.promise().query(sql6, [ oracle, tech_oracle]);


    sql4 = `update Preferances set PreferedLocation =?, NoticePeriod = ?,ExpectedCTC = ?,CurrentCTC = ? where pre_id = ${req.params.id}`
    for (let i = 0; i < location.length; i++) {
        var preference = await con.promise().query(sql4, [ location[i], period[i], expected[i], current[i]]);
    }
};



module.exports = { getform, postrecord, getshow, getupdate, postupdate }