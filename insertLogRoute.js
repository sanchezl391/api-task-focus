const express = require('express');
const time = require('./time');
const router = express.Router();
const config = require('./database');
var app = express();
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
// On POST request (new entry will be added to db)
router.post('/', (req, response) => {
    const { Client } = require('pg')
    const client = new Client(config);

    let strDate = time.getDate();
    
    const addDataToTableQuery = {
        text: 'INSERT INTO logs (date, minutes, username) VALUES($1, $2, $3)',
        values: [
            strDate, 
            req.body.minutes,
            req.body.username
        ]
    }

    client.connect();

    client.query(addDataToTableQuery, (err, res) => {
        client.end();
    });
});

module.exports = router;