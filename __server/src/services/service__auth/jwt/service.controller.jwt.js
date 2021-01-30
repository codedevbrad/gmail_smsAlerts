const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const Users    = require('../service.model');

// npm install jwt.
// Login with username and password. this should generate a JWT token.
// store token in async storage
// create postman route to test

exports.jwtAuth = ( req, res , next ) => {
    // send token from front-send
    const token = req.header('x-auth-token');

    if( !token ) {
       res.status(401).json( { msg: 'no token authorizaion'} );
    }
    try {
      // verify token
      const decoded = jwt.verify(token , process.env.JWT_SECRET);
      // add user from payload
      req.user = decoded;
      next();
    }
    catch( e ) {
      res.status( 400 ).json( {msg: 'token is not valid' });
    }
}

exports.getUser = ( req , res , next ) => {
   res.status( 200 ).send( req.user );
}


exports.loginInitial = ( req , res , next ) => {

  const { username , password , accessObj } = req.body;
  // simple validation
  if ( !username || !password ) {
    throw new Error( 'missing credentials' );
  }

  Users.findOne( { username } )
    .then( user => {
       if (!user) return res.status(400).json( { msg: 'user exists' } );
       // validate password
       bcrypt.compare( password , user.password )
             .then( isMatch => {
                 if (!isMatch) {
                     return res.status(400).json( { msg: 'invalid login' });
                 } else {
                     Users.findByIdAndUpdate( { _id: user._id } , { access : accessObj } , { new : true } )
                          .then(  user => {
                              jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 },
                                ( err , token ) => {
                                  if ( err) throw err;
                                  // send json
                                  res.json( { token , user: { id: user.id , username: user.username } });
                                }
                              )
                          })
                          .catch( err => {
                              console.log( err );
                              throw new Error( err );
                          });
                  }
             })
    })
    .catch( next );
}
