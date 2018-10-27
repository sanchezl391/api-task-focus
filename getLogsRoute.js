const express = require('express');
const time = require('./time');
const router = express.Router();
const config = require('./database');
// On GET request, get all entries for the day
router.post('/', (req, response) => { 
    const { Client } = require('pg')
    const client = new Client(config);
    let strDate = time.getDate();
    
    const getLogsFromDB = {
        text: 'SELECT sum(minutes) FROM logs WHERE date = $1 and username = $2',
        values: [strDate, req.body.username]
    };

    client.connect();

    client.query(getLogsFromDB, (err, res) => {
        if(res.rows[0].sum)
            response.send({minutes:res.rows[0].sum});
        else
            response.send({minutes: 0});
        client.end();
    });
})

module.exports = router;