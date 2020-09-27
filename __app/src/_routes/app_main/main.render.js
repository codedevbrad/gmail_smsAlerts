import React , { useContext , useEffect } from 'react';

import AppContextProvider from './main__contexts/appContext';
import { AppContext }     from './main__contexts/appContext';

import Main_Login from './main__login/noauth.login';
import Main__auth from './main__auth/auth.main';

import { loginHandle } from './main__login/main__requests/request.login';

import './main.styles.scss';

const RenderAuthComponent = ( ) => {

    const { isUser , loginUserState , setError } = useContext( AppContext );

    useEffect( ( ) => {
          loginHandle.getUser()
              .then( user => loginUserState( user ))
              .catch( err => {
                  console.log( err );
                  setError( [ true , err ] )
              });
    } , [ ] );

    return (
      <div className="app_main">
          {  isUser ? 'true logged' : 'false logged'    }
          { !isUser ? <Main_Login />  :  <Main__auth /> }
      </div>
    )
}

const App_main = ( ) => {
      return (
          <AppContextProvider>
              <RenderAuthComponent />
          </AppContextProvider>
      )
}

export default App_main;
