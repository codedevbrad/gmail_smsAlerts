
import axios from 'axios';

const config  = { headers: { 'Content-Type': 'application/json' } };

export const loginHandle = ( ( ) => ( {

      getUser: ( ) => {
            return new Promise( ( resolve , reject ) => {
                  axios.get('/api/auth/user' )
                       .then(  res => resolve( res.data ))
                       .catch( err =>  reject( err.response.data ));
            });
      } ,
      loginUser: ( email , googleId , accessObj ) => {
            return new Promise( ( resolve , reject ) => {
                const body = JSON.stringify({
                     username: email ,
                     password: googleId ,
                     accessObj: accessObj
                });
                axios.post('/api/auth/login' , body , config )
                     .then(  res => resolve( res.data ))
                     .catch( err =>  reject( err.response.data ));
            });
      }
} ) ) ( );
