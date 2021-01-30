
import axios from 'axios';
const localPort = 'http://192.168.1.64:5000';
const config = { headers: { 'Content-Type': 'application/json' } };

import signInWithGoogleAsync from './library/googlelogin';

export const LoginAPI = ( ( ) => ({

      test: ( ) => {
          return new Promise( ( resolve , reject ) => {
              axios.get( `${ localPort }/api/v0` )
                   .then(   res => res.data )
                   .then(  data => resolve( data ))
                   .catch(  err => reject( err.response.data ) );
          });
      } ,

      getUser: ( ) => new Promise( ( resolve , reject ) => {
            axios.get(`${ localPort }/api/auth/user` )
                 .then(  res => resolve( res.data ))
                 .catch( err =>  reject( err.response.data ));
      }) ,


      loginWithGoogle: () => new Promise( async ( resolve , reject ) => {
            signInWithGoogleAsync()
                .then( res => {
                    let { accessToken , refreshToken , user } = res.body;
                    // send data to server...
                    let { email , username , id } = user;
                    const body = JSON.stringify({
                         username: email ,
                         password: id ,
                         accessObj: accessToken ,
                         refreshToken: refreshToken
                    });
                    console.log( res.body );
                    // axios.post('/api/auth/login' , body , config )
                    //      .then(  res => resolve( res.data ))
                    //      .catch( err =>  reject( err.response.data ));
                    // update user to context.
                    resolve({
                      accessToken , refreshToken , user
                    });
                })
                .catch( err => reject( err ) );
      }) ,

      post_step1: ( ) => new Promise( async ( resolve , reject ) => {
          axios.post(`${ localPort } /api/app/register/stage1` , body , config )
               .then(  res => {
                  resolve( res.data );
                })
               .catch( err =>  reject( err.response.data ));
      }) ,

      post_step2: ( ) => new Promise( async ( resolve , reject ) => {
          axios.post(`${ localPort } /api/app/register/stage2` , body , config )
               .then(  res => {
                 resolve( res.data );
               })
               .catch( err =>  reject( err.response.data ));
      }) ,

      post_step3: ( ) => new Promise( async ( resolve , reject ) => {
          axios.post(`${ localPort } /api/app/register/stage3` , body , config )
               .then(  res => {
                 resolve( res.data );
               })
               .catch( err =>  reject( err.response.data ));
      })
}))();
