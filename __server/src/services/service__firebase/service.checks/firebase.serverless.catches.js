
const testFunction__reject = ( ) => new Promise( ( resolve , reject ) => {
      reject( 'err' );
});

const testFunction__resolve = ( ) => new Promise( ( resolve , reject ) => {
      resolve( 'succ' );
});

const testFunction__inner = ( user ) => new Promise( async ( resolve , reject ) => {
      try {
          console.log( user );
          await testFunction__reject();
          resolve('correct');
      }
      catch( err ) {
          reject( 'some error' );
      }
});

module.exports.serverless_testcatching = async ( req , res , next ) => {
      try {
          await testFunction__inner( { user: 'brad' } );
          console.log( 'after inner');
          res.status( 200 ).send( 'success' );
      }
      catch ( err ) {
          res.status( 500 ).send( { status: 'error' , msg: err } );
      }
};
