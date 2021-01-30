const Users = require('./service.model');

const { asyncSupport } = require('@codedevbrad/serverutils');

const { getUsersFromDB , getUserFromDB , updateUserToken , awaitgetUsers } = require('./service.controller.db').userQueries__server;
const { getUsersToken , updateuserSenders } = require('./service.controller.db').userQueries__serverless;
const { findId_error } = require('./service.controller.db').userQueries__errorProne;


// === SERVERLESS === //

exports.updateuserSenders = ( req , res , next ) => {
    let id = '5f4fe6e3ed36ed9a7e903b58';
    let object = {
      email : '%3Asupport%40usercrowd.com' ,
      lastCheckCount : 29
    }
    updateuserSenders( id , object )
        .then( data => res.status( 200 ).send( data ) )
        .catch( err => res.status( 500 ).send( err  ) );
}

exports.getUsersToken = ( req , res , next ) => {
    getUsersToken()
        .then( data => res.status( 200 ).send( data ) )
        .catch( err => res.status( 500 ).send( err  ) );
}


// === IN APP === //

exports.user_single = ( req , res , next ) => {
    getUserFromDB()
        .then( user => res.status( 200 ).send( user ) )
        .catch( err => res.status( 500 ).send( err ) );
}

exports.users_get = ( req , res , next ) => {
    getUsersFromDB()
        .then( users => res.status( 200 ).send( users ) )
        .catch(  err => res.status( 500 ).send( err ) );
}

exports.testUpdateToken = ( req , res , next ) => {
      updateUserToken( { token: 'testtoken' , expiry: 'testdate' } )
          .then(  user => res.status( 200 ).send( user ) )
          .catch( next );
}

exports.users_async = asyncSupport( async ( req , res , next ) => {
      let results = await awaitgetUsers();
      console.log( results );
      res.status( 200 ).send( results );
});


// === ERRORS === //

exports.users_error = async ( req , res , next ) => {
      try {
          let users = await findId_error();
          res.status( 200 ).send( users );
      }
      catch( err ) {
          res.status( 500 ).send( 'error' );
      }
}
