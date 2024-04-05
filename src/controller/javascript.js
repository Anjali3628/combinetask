var express = require("express");
var bodyParser = require('body-parser');
// const md5 = require('md5');
const path = require("path");
// const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const con = require('../config/connection');

var app = express();
app.use(cookieParser())

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


const dynamictable = async (req,res) => {
    try{
        res.sendFile(path.join(__dirname, '../../public', 'pages', 'table.html'));
    } catch (err) {
        res.send(err);
    }
};
const events = async (req,res) => {
    try{
        res.sendFile(path.join(__dirname, '../../public', 'pages', 'event.html'));
    } catch (err) {
        res.send(err);
    }
};
const kube = async (req,res) => {
    try{
        res.sendFile(path.join(__dirname, '../../public', 'pages', 'game.html'));
    } catch (err) {
        res.send(err);
    }
};
const tictac = async (req,res) => {
    try{
        res.sendFile(path.join(__dirname, '../../public', 'pages', 'TicTacToe.html'));
    } catch (err) {
        res.send(err);
    } 
};
const form = async (req,res) => {
    try{
        res.sendFile(path.join(__dirname, '../../public', 'pages', 'formt.html'));
    } catch (err) {
        res.send(err);
    } 
};
const fetchAPIdata = async (req,res) => {
    try {
        res.sendFile(path.join(__dirname, '../../public', 'pages',"index.html"));
    } catch (err) {
        console.log(err);
    }
};
const fetchdetail = async (req,res) => {
    try {
        res.sendFile(path.join(__dirname, '../../public', 'pages', "user.html"));
    } catch (err) {
        console.log(err);
    }
}

module.exports = { dynamictable, events, kube, tictac, form, fetchAPIdata, fetchdetail };
