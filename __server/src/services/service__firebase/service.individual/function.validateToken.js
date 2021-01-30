const { time } = require('@codedevbrad/better_date');

const { timeDifference , toJSON } = time;

const timeNeeded = require('../../firebase_info.json').serverless_schedule;

const serverless__checkValidToken = ( user ) => new Promise( async ( resolve , reject ) => {
      try {
          let { expiry } = user.access;

          var now_date = new Date();
          var end_date = new Date();
              end_date.setTime( expiry );

          var differenceTime = timeDifference( now_date , end_date , timeNeeded );
          var checkTimeDiff  = differenceTime.differenceIsOk;

          var tokenIsValid = false;

          if ( !differenceTime.isNegative && checkTimeDiff.withinframe ) {
              tokenIsValid = true;
          }
          resolve( tokenIsValid );
      }
      catch ( err ) {
          reject('something went wrong validating user token');
      }
});

module.exports = serverless__checkValidToken;
