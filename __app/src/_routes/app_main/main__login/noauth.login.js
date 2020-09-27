import React , { useContext } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { AppContext } from '../main__contexts/appContext';

import { loginHandle } from './main__requests/request.login';

const Main_Login = ( ) => {

      const {
          setError , loginUserState , setAuthErr
      } = useContext( AppContext );

      const responseGoogleError = ( error ) => {
           console.log( 'error' , error );
           setError( [ true , { message : error } ] );
      }

      const responseGoogleSuccess = ( res ) => {
           console.log( res );
           const { email , googleId } = res.profileObj;
           const { access_token , expires_at } = res.tokenObj;
           const accessObj = {
                 token : access_token ,
                expiry : expires_at
           };

           loginHandle.loginUser( email , googleId , accessObj )
                      .then( user => loginUserState( user ))
                      .catch( err => setAuthErr( [ true , err ] ) );
      }

      return (
        <div className="main__login">
            <GoogleLogin
              clientId={ process.env.REACT_APP__Google_clientId }
              buttonText="Login"
              onSuccess={ responseGoogleSuccess }
              onFailure={ responseGoogleError }
              cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Main_Login;
