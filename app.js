
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    CartoDB = require('cartodb'),
    path = require('path'),
    fs =  require('fs'),
    secret;

// make localhost and heroku happy
// so very, very happy
// helps if you have a "secret.js" file
if (fs.existsSync('./secret.js')) {
    console.log("We're working local!");
    secret = require('./secret.js');
} else {
    secret = {};
    secret.USER = false;
    secret.API_KEY = false;
}

// var client = new CartoDB({user: secret.USER, api_key: secret.API_KEY});
var client = new CartoDB({user: secret.USER || process.env.USER,
                          api_key: secret.API_KEY || process.env.API_KEY});

client.on('connect', function () {
	console.log("Hello CartoDB!");
});

client.connect();

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', function (req, res) {
    res.render('index', { title: 'GeoCare' });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
    console.log("http://127.0.0.1:" + app.get('port'));
});
