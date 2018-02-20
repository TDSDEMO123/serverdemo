var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// Add headers
//app.use(function (req, res, next) {

    // Website you wish to allow to connect
  //  res.setHeader('Access-Control-Allow-Origin', 'http://34.192.184.245:3000/notes');

    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
   // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    //next();
//});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url, {
    useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})
// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
// Require Notes routes
require('./app/routes/note.routes.js')(app);
// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
