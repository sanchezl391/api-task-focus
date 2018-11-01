const express = require('express');
const router = express.Router();
const config = require('./database');

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

// register a user router
router.post('/', (req, response) => {
    const { Client } = require('pg')
    const client = new Client(config);
    
    // Check if an user exists
    const checkIfUserExists = {
        text: 'SELECT * FROM users WHERE username=$1',
        values: [req.body.username]
    }

    // If user doesn't exist than create new user
    const addDataToTableQuery = {
        text: 'INSERT INTO users (username, password) VALUES($1, $2)',
        values: [req.body.username, req.body.password]
    }

    client.connect();

    client.query(checkIfUserExists, (err, res) => {
        if(res){
            if(err)
                response.send({success: false});
            else {
                let responseObj = {success : true};
                if(res.rowCount == 0){
                    client.query(addDataToTableQuery, (error, resp) => {
                        if(err)
                            response.send({success: false});
                        else {
                            if(resp.rowCount > 0)
                                response.send(responseObj);
                            else    
                                response.send({success: false});
                        }
                        client.end();
                    });
                }
                else    
                    response.send({success: false});
            }
        }
    });
    
});
module.exports = router;