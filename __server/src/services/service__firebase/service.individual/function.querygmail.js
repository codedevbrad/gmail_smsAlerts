
// gmail
const gmail__call = require('../../../service__gmail/service.controller').queryGmail_Function;
// users
const { updateUsersenders } = require('../../../service__auth/service.controller.db').userQueries__serverless;

const serverless__gmail_response = ( user ) => new Promise( async ( resolve , reject ) => {
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

          await updateUsersenders( user._id , userSenders );

          resolve ( {
              lengthChecks : { inboxlength : messages.length , lastCheckCount } ,
              newMessagesExist
          } );
      }
      catch ( err ) {
          reject( 'err' );
      }
});

module.exports = serverless__gmail_response;
