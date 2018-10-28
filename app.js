const express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var registerRoute = require('./registerRoute');
var loginRoute = require('./loginRoute');
var subscribeRoute = require('./pushNotificationRoute');
var getLogsRoute = require('./getLogsRoute');
var insertLogRoute = require('./insertLogRoute');
const port = process.env.PORT || 3001;
const passport = require('passport');

// Session Middle ware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
// Passport Config
require('./passport')(passport);
// // passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Telling all to look in logRoutes to see if it can handle '/'
// app.use('/', logRoutes);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/getLogs', getLogsRoute);
app.use('/insertLog', insertLogRoute);
app.use('subscribe', subscribeRoute);

app.listen(port, () => console.log(`Listening on port ${port}!`));