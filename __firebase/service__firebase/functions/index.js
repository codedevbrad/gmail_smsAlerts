const functions = require('firebase-functions');

const timeSchedule = require('../../firebase_info.json').serverless_schedule;

exports.scheduledFunction = functions.pubsub.schedule(`every ${ timeSchedule } minutes`).onRun( async (context) => {
        console.log( 'hey' );
        try {

        }
        catch ( err ) {

        }
});
