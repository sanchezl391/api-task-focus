const express = require('express');
const time = require('./time');
const router = express.Router();
const config = require('./database');
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