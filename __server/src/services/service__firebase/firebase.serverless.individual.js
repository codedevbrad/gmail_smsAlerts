const { asyncSupport } = require('@codedevbrad/serverutils');
// twilio
const { sendSingleMessage , sendBulkMessages } = require('../../service__smsTwillo/service.controller').twilioFunctions;
const { sendSingleMessage__promisify , sendBulkMessages__promisify } = require('../../service__smsTwillo/service.controller').twilioFunctions_promisified;

// users
const { getUsersToken } = require('../../service__auth/service.controller.db').userQueries__serverless;

const { time } = require('@codedevbrad/better_date');

const { timeDifference , toJSON } = time;

const serverless__checkValidToken = require('./service.individual/function.validateToken');
const serverless__gmailresponse   = require('./service.individual/function.querygmail');

// gmail
const gmail__call = require('../../service__gmail/service.controller').queryGmail_Function;

module.exports.serverless_individual__checkValidToken = async ( req , res , next ) => {
      try {
          let users = await getUsersToken();
          let user  = users[0];
          let tokenIsValid = await serverless__checkValidToken( user );
          res.status( 200 ).send( tokenIsValid );
      }
      catch ( err ) {
          res.status( 500 ).send( { status: 'error checking for user token' , msg: err } );
      }
}

module.exports.serverless_individual__gmailResponse = async ( req , res , next ) => {
      try {
          let users = await getUsersToken();
          let user  = users[0];

          let { token }   = user.access;
          let userSenders = user.senders;
          let userEmailParsed = user.emailparsed;

          let { email , lastCheckCount } = userSenders[0];

          let gmailRequestObject = {
              userEmail    : userEmailParsed ,
              senderFilter : email ,
              accessKey    : token
          }

          let { messages } = await gmail__call( gmailRequestObject );

          let newMessagesExist = false;

          if ( messages.length > lastCheckCount ) newMessagesExist = true;

          res.status( 200 ).send( {
              lengthChecks : { inboxlength : messages.length , lastCheckCount },
              newMessagesExist
          } );
      }
      catch ( err ) {
          res.status( 500 ).send( { status: 'error checking gmail' , msg: err } );
      }
}

const serverless_function = ( ) => new Promise( async ( resolve , reject ) => {
      try {
          let users = await getUsersToken();
          let user  = users[0];

          let { accessCode , number } = user.phoneNumber;

          let tokenIsValid = await serverless__checkValidToken( user );

          if ( tokenIsValid ) {
              let userMailcheck = await serverless__gmailresponse( user );
              let {  } = userMailcheck;

              if ( userMailcheck.hasmail ) {
                  await sendSingleMessage__promisify(
                     `${accessCode}${ number }` ,
                     'you have new mail from user in your inbox'
                  );
              }
          }
          else {
              // make sure if sending message casues error, it gets caught by my catch statement.
              await sendSingleMessage__promisify(
                   `${accessCode}${ number }` ,
                   'your access token has expired. we require you login to continue checking for new emails'
              );
          }
          resolve('success');
      }
      catch ( err ) {
          reject( 'error' );
      }
});

module.exports.serverless_function = serverless_function;

module.exports.serverless_route = asyncSupport( async ( req , res , next ) => {
      await serverless_function();
      res.status( 200 ).send( 'serverless' );
});
