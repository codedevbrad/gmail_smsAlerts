const mongoose = require('mongoose');
// schema object
const UsersSchema = new mongoose.Schema ({
  username:    { type: String } ,
  password:    { type: String } ,
  emailparsed: { type: String } ,
  isNewUser:   { type: Boolean } ,
  access: {
      token:  String ,
      expiry: String
  } ,
  imgUrl: { type: String } ,
  phoneNumber: {
      accessCode: String ,
      number:     String
  } ,
  senders: [
      {
        email: String ,
        lastCheckCount: Number
      }
  ]
});

module.exports = mongoose.model( 'users' , UsersSchema );
