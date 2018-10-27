const express = require('express');
const router = express.Router();
const passport = require('passport');


var bodyParser = require('body-parser');
var app = express();
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

router.post('/', passport.authenticate('local'),
function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send({authenticated: true});
});
module.exports = router;