const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const webpush = require('web-push');
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
app.use(bodyParser.json());


// Push Notifications
webpush.setVapidDetails('mailto:test@test.com', process.env.publicVapidKey, process.env.privateVapidKey);

// let pushIntervalId;
let subscription;

// Subscribe Route
router.post('/', (req, response) => { 
    // Get push subscription object
    console.log(req.body);
    subscription = req.body.subscription;
    let message = req.body.message;

    // Send 201 - resource created
    response.status(201).json({});

    // Create payload
    const payload = JSON.stringify({title: `NOTE-STACK - ${message}`});
    
    // Pass object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.log(err))
});

module.exports = router;