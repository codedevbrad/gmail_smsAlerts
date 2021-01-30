// spa routes (  )
const express  = require('express');
const api_test = express.Router();

api_test.get('/' , ( req , res , next ) => res.status(200).send('/test/'));

// const Api_firebase_timechecks = require('./services/service__firebase/functions_develop/service.checks/firebase.serverless.test');
// const Api_firebase_catches    = require('./services/service__firebase/functions_develop/service.checks/firebase.serverless.catches');
// const Api_firebase_individual = require('./services/service__firebase/functions_develop/firebase.serverless.individual');

const Api_auth   = require('./services/service__auth/service.controller.test');
const Api_Gmail  = require('./services/service__gmail/service.controller');
const Api_Twillo = require('./services/service__smsTwillo/service.controller');

// service : auth
api_test.get('/auth/get'           , Api_auth.users_get );
api_test.get('/auth/get_async'     , Api_auth.users_async );
api_test.get('/auth/get_error'     , Api_auth.users_error );
api_test.get('/auth/updateToken'   , Api_auth.testUpdateToken );

// App

// firebase
// api_test.get('/firebase/serverless/timecheck' , Api_firebase_timechecks.serverless_functiontime );
// api_test.get('/firebase/serverless/catches'   , Api_firebase_catches.serverless_testcatching );
//
// api_test.get('/firebase/serverless/individual/checktoken' , Api_firebase_individual.serverless_individual__checkValidToken );
// api_test.get('/firebase/serverless/individual/checkgmail' , Api_firebase_individual.serverless_individual__gmailResponse );

// gmail routes
api_test.get('/gmail/queryGmail'   , Api_Gmail.queryGmail_Test );
// Twillo routes
api_test.get('/sms/message/single' , Api_Twillo.sendSMS_single__TEST );
api_test.get('/sms/message/bulk'   , Api_Twillo.sendSMS_bulk__TEST   );


module.exports = api_test;
