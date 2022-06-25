var express = require('express')
var config = require('config')
var bodyParser =require('body-parser')
var session = require('express-session')
var socketio = require('socket.io')
var app =express();
app.use(bodyParser.json())
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.set("views","app/views");
app.set("view engine","ejs");
app.use("/static",express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }))
var controllers = require('./app/controllers');
app.use(controllers)
var host = config.get("server.host")
var port = config.get("server.port")
var server = app.listen(port,host,function(){
	console.log('app is on ',port);
});
var io = socketio(server);

var socketcontrol = require("./app/common/socketcontrol.js")(io);
