"use strict";

var express = require('express');

var data_retriever = require('./data_retriever');

var app = express();
app.get('/', function (req, res) {
  data_retriever.getData();
  res.sendFile(__dirname + '/index.html');
});
app.get('/app.js', function (req, res) {
  res.sendFile(__dirname + '/app.js');
});
app.get('/data_retriever.js', function (req, res) {
  res.sendFile(__dirname + '/data_retriever.js');
});
app.get('/data_reader.js', function (req, res) {
  res.sendFile(__dirname + '/data_reader.js');
});
app.get('/worldwind.js', function (req, res) {
  res.sendFile(__dirname + '/worldwind.js');
});
app.get('/index.html', function (req, res) {
  data_retriever.getData();
  res.sendFile(__dirname + '/index.html');
});
app.get('/debrisData.json', function (req, res) {
  res.sendFile(__dirname + '/debrisData.json');
});
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});