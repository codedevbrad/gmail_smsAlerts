
import axios from 'axios';

const config  = { headers: { 'Content-Type': 'application/json' } };

export const api_example = ( ( ) => ( {

      getData: ( ) => {
            return new Promise( ( resolve , reject ) => {
                axios.get('/api/example/data' )
                     .then( data => resolve( data ))
                     .catch( err => reject( err.response.data ));
            });
      } ,

      sendData: ( obj ) => {
            return new Promise( ( resolve , reject ) => {
                const body = JSON.stringify( obj );
                axios.post('/api/example/data' , body , config )
                     .then( res  => res.data )
                     .then( data => resolve( data ))
                     .catch( err => reject( err.response.data ));
            });
      }

}))( );
