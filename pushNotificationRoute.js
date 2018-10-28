const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const webpush = require('web-push');
var app = express();
app.use(bodyParser.json());


webpush.setGCMAPIKey(process.env.googleAPIKey);

// Push Notifications
webpush.setVapidDetails('mailto:test@test.com', process.env.publicVapidKey, privateVapidKey);

// let pushIntervalId;
let subscription;

// Subscribe Route
router.post('/', (req, response) => { 
    // Get push subscription object
    subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({title: 'Note-Stack'});
    
    // Pass object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.log(err))

    
});

// router.delete("/unregister", (req, res, next) => {
//     subscription = null;
//     clearInterval(pushIntervalId);
//     res.sendStatus(200);
// });

module.exports = router;