
// import user schema.
const { updateUserFromDB } = require('../service__auth/service.controller.db').userUpdates;

// stage 1: post phone number and given username.
exports.register__stage_1 = ( req , res , next ) => {
    let { phoneNumber , username } = req.body;
    phoneNumber = {
      accessCode : '44' ,
      number : phoneNumber
    }
    updateUserFromDB( req.user._id , {
        phoneNumber , username
    } )
    .then( user => res.status( 200 ).send( user ) )
    .catch( next );
}

// stage 2: add senders.
exports.register__stage_2 = ( req , res , next ) => {
    let { senders } = req.body;
    updateUserFromDB( req.user._id , {
        senders
    } )
    .then( user => res.status( 200 ).send( user ) )
    .catch( next );
}

// stage 3: complete user register.
exports.register__stage_3 = ( req , res , next ) => {
    updateUserFromDB( req.user._id , {
        isNewUser: False
    } )
    .then( user => res.status( 200 ).send( user ))
    .catch( next );
}
