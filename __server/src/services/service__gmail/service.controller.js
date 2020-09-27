const axios = require('axios');

const queryGmail_allMessages = ( user ) => new Promise( async ( resolve , reject ) => {
      let { userEmail , senderFilter , accessKey } = user;
      let config = {
          headers: { Authorization: `Bearer ${ accessKey }` }
      }
      axios.get(`https://gmail.googleapis.com/gmail/v1/users/${ userEmail }/messages?&q=from${ senderFilter }&key=${ process.env.gmail__apikey }` , config )
           .then( query => resolve( query.data ) )
           .catch(  err => reject( err ) );
});

const queryGmail_singleMessage = ( ) => new Promise( async ( resolve , reject ) => {
      resolve();
});

module.exports.queryGmail_Function = queryGmail_allMessages;

module.exports.queryGmail_Test = ( req , res , next ) => {
      let { accessKey } = req.query;
      let user = {
        userEmail :    'codedevbrad%40gmail.com' ,
        senderFilter : '%3Asupport%40usercrowd.com' ,
        accessKey : accessKey
      }
      queryGmail_allMessages( user )
          .then( data => res.status( 200 ).send( data ) )
          .catch( next );
}
