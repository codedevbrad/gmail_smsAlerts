
import axios from 'axios';

const config  = { headers: { 'Content-Type': 'application/json' } };

export const userHandle = ( ( ) => ( {

      settingsUpdate: ( ) => {

      } ,

      logoutUser: ( ) => {
            return new Promise( ( resolve , reject ) => {
              
                axios.get('/api/auth/logout' )
                     .then(  res => resolve( res.data ))
                     .catch( err =>  reject( err.response.data ));
            });
      }
} ) ) ( );
