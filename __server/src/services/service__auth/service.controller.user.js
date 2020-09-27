
const passport = require('passport');
const Users    = require('./service.model');

require('./service.passport') ( passport );

exports.user_logged = ( req , res , next ) => {
    let user = JSON.stringify( req.user );
    console.log( user );
    res.status( 200 ).send( req.user );
}

exports.user_get = ( req , res , next ) => {
   if ( !req.user ) {
        throw new Error('user not logged in' );
   }
   else {
     Users.findById( { _id: req.user._id } )
          .select('-password')
          .then( user => {
            if ( !user ) { return res.status(500).send({ msg: 'no user found' }) }
            res.status( 200 ).json( user );
          })
          .catch( next );
   }
}

exports.user_login = ( req , res , next ) => {

   const { username , password , accessObj } = req.body;

   // simple validation
   if ( !username || !password ) {
         throw new Error( 'missing username or password' );
   }
   passport.authenticate( 'local', ( err , user , info ) => {
         if ( err || !user ) { return res.status(500).send({ msg: 'username or password is incorrect' }) }

         req.logIn( user,  ( err ) => {

           if (err) { return res.status(500).send({ msg: 'username or password is incorrect' })  }

           Users.findByIdAndUpdate( { _id: user._id } , { access : accessObj } , { new : true } )
                .then(  user => res.status(200).json( user ) )
                .catch( err => {
                    console.log( err );
                    throw new Error( err );
                });
         });

   }) ( req , res , next );
}

exports.user_logout = ( req , res , next ) => {
    req.logout();
    if ( req.user ) {  return res.status(500).send({ msg: 'something went wrong logging out' }) }
    res.status(200).json( { logoutHappened: true } );
}
