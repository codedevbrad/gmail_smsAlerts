
const twilio = require('twilio');
const { asyncSupport } = require('@codedevbrad/serverutils');

const twilioClient = new twilio( process.env.twilio__accountID , process.env.twilio__authToken );

const sendSingleMessage = ( singleNumber , message ) => {
      return twilioClient.messages.create({
          body:  message ,
          to:    singleNumber ,    // Text this number
          from: '+18174840737'   // From a valid Twilio number
      })
      .catch( err => {
          throw new Error('could not send text message');
      });
};

const sendBulkMessages = ( numbers , message ) => {
      const bindings = numbers.map( number => {
            return JSON.stringify({ binding_type: 'sms', address: number });
      });

      return twilioClient.notify.services( process.env.twilio__bulkSID ).notifications.create({
            toBinding: bindings ,
            body:      message
      })
      .catch( err => {
            throw new Error('could not send bulk text messages');
      });
};

module.exports.sendSMS_single__TEST = asyncSupport ( async (  req , res , next ) => {
      let sendSingle = await sendSingleMessage( '+4407715656191' ,'test text message' );
      res.send( 'message send' );
});

module.exports.sendSMS_bulk__TEST = asyncSupport ( async ( req , res , next ) => {
      const numbers = [
        '+4407715656191' , '+4407899057397'
      ];
      let sendBulk = await sendBulkMessages( numbers );
      res.send( 'messages sent' );
});

module.exports.twilioFunctions = {
      sendSingleMessage , sendBulkMessages
}

const sendSingleMessage__promisify = ( ) => new Promise( ( resolve , reject ) => {
      twilioClient.messages.create({
          body:  message ,
          to:    singleNumber ,    // Text this number
          from: '+18174840737'   // From a valid Twilio number
      })
      .then( message => resolve('complete') )
      .catch(  error => reject( 'could not send text message to single user' ) );
});


const sendBulkMessages__promisify = ( numbers , message ) => new Promise( ( resolve , reject ) => {
      const bindings = numbers.map( number => {
            return JSON.stringify({ binding_type: 'sms', address: number });
      });

      twilioClient.notify.services( process.env.twilio__bulkSID ).notifications.create({
            toBinding: bindings ,
            body:      message
      })
      .then( message => resolve('complete') )
      .catch(  error => reject( 'could not send bulk text messages' ) );
});


module.exports.twilioFunctions_promisified = {
      sendSingleMessage__promisify , sendBulkMessages__promisify
}
