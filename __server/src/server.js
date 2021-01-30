const express = require('express');
const mongoose = require('mongoose');
const path    = require('path');

const app    = express();
const PORT   = process.env.PORT || 5000;
const server = require('http').createServer( app );

app.use(express.static(__dirname + '/public'));

var config = require('./config/settings.js');
    config.development( app , __dirname );
    config.middleware(  app , __dirname );
    config.authChecks(  app , __dirname );

// connect to mblabs
mongoose.connect( process.env.DATABASE_ATLAS , { useNewUrlParser: true } )
        .then ( ()  => console.log('mongodb Connected'))
        .catch( err => console.log( err ));

// api's
app.get('/google' , ( req, res , next ) => {
     res.sendFile( path.join(__dirname , 'public' , 'index.html'));
});

app.use('/test' , require('./api.test') );
app.use('/api'  , require('./api') );

// error middleware
require('./errors').errors( app );

server.listen( PORT, ( ) => console.log(`Listening on ${ PORT }`));
