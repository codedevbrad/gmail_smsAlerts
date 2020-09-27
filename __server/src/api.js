
// spa routes (  )
const express = require('express');
const api     = express.Router();

// routes
const Api_Auth = require('./services/service__auth/service.controller.user');

// authentication routes
api.get( '/auth/logged' , Api_Auth.user_logged );
api.get( '/auth/user'   , Api_Auth.user_get   );
api.post('/auth/login'  , Api_Auth.user_login );
api.get( '/auth/logout' , Api_Auth.user_logout );

module.exports = api;
