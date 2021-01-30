
// import user schema.
const { updateUserFromDB } = require('../service_auth/service.controller.db').userUpdates;

// call the main route or test function?

module.exports.testUserUpdate = ( req , res , next ) => {

     let try_succeed = {
        phoneNumber: '07715656191' ,
        username: 'test_124@gmail.com'
     }

     let try_failure = {
        phoneNumber: 12345 ,
        username: 20
     }

      updateUserFromDB( req.user._id , {
          phoneNumber: try_succeed.phoneNumber ,
          username:    try_succeed.username
      } )
      .then( user => res.status( 200 ).send( user ) )
      .catch( next );
}
