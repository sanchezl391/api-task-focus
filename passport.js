 LocalStrategy = require('passport-local').Strategy;
const config = require('./database');
const bcrypt = require('bcryptjs');

module.exports = function(passport ) {
    passport.use(new LocalStrategy(function(username, password, done){
        //  match username
        const { Client } = require('pg')
        const client = new Client(config);        
        const addDataToTableQuery = {
            text: 'SELECT * FROM users WHERE username=$1',
            values: [username]
        }
        client.connect();
        client.query(addDataToTableQuery, (err, res) => {
            let pw = '';
            if(err) 
                return done(null, false);
            // match username            
            if(res.rowCount > 0) 
                pw = res.rows[0].password;
            else // No user found   
                return done(null, false, {message: 'user not found'});
            // Match passworduser
            bcrypt.compare(password, pw, function(err, isMatch){
                if(err) throw err;
                if(isMatch)
                    return done(null, res.rows[0]); //ReferenceError: user is not defined
                else    
                    return done(null, false, {message: 'wrong password'});
            });

            client.end();
        });
    }));
    // prepare user object for storage
    passport.serializeUser(function(user, done){
        done(null, user.username);
    });
    
    // getting an object from the user data
    passport.deserializeUser(function(username, done){
        const { Client } = require('pg')

        const client = new Client(config);
        
        const addDataToTableQuery = {
            text: 'SELECT * FROM users WHERE username=$1',
            values: [username]
        }

        client.connect();
        client.query(addDataToTableQuery, (err, res) => {
            done(err, res.rows[0]);
        });

        client.end();
        // done(null, user);
    });
}


