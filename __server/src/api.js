
// spa routes (  )
const express = require('express');
const api     = express.Router();
// routes
const Api_Auth = require('./services/service__auth/service.controller.user');
const Api_App  = require('./services/service__app/service.controller.requests');

// test
api.get('/' , ( req , res , next ) => {
  console.log('hit');
  res.status( 200 ).send( 'success' );
});

// authentication routes
api.get( '/auth/logged' , Api_Auth.user_logged );
api.get( '/auth/user'   , Api_Auth.user_get   );
api.post('/auth/login'  , Api_Auth.user_login );
api.get( '/auth/logout' , Api_Auth.user_logout );

// app to server data routes.
api.post('/app/register/stage1' , Api_App.register__stage_1 );
api.post('/app/register/stage2' , Api_App.register__stage_2 );
api.post('/app/register/stage3' , Api_App.register__stage_3 );

module.exports = api;
