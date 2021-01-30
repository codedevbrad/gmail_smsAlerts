
const { time } = require('@codedevbrad/better_date');

const { timeDifference , toJSON } = time;

const timeNeeded = require('../../firebase_info.json').serverless_schedule;

module.exports.serverless_functiontime = ( req , res , next ) => {
      var now_date = new Date();
          now_date.setHours( 20 );
          now_date.setMinutes( 37 );

      var end_date = new Date();
          end_date.setHours( 20 );
          end_date.setMinutes( 45 );
          end_date.setSeconds( 25 );

      var differenceTime = timeDifference( now_date , end_date , timeNeeded );
      var checkTimeDiff  = differenceTime.differenceIsOk;

      res.status( 200 ).send( {
          times: [
              toJSON( now_date ) ,
              toJSON( end_date )
          ] ,
          difference:    differenceTime ,
           morethan5:   !differenceTime.isNegative && checkTimeDiff.withinframe
      });
}
