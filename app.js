var express = require('express');
var data_retriever = require('./data_retriever');

var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html') 
    data_retriever.getData();
})
app.get('/app.js', function (req, res) {
    res.sendFile(__dirname+'/app.js') 
})
app.get('/data_retrieverB.js', function (req, res) {
    res.sendFile(__dirname+'/data_retriever.js') 
})
app.get('/worldwind.js', function (req, res) {
    res.sendFile(__dirname+'/worldwind.js') 
})
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname+'/index.html') 
})
app.get('/debrisData.json', function (req, res) {
    res.sendFile(__dirname+'/debrisData.json') 
})

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
})