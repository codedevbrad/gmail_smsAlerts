import React , { createContext , useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ( props  ) => {
    const [ user   , setUser  ] = useState( { } );
    const [ isUser , setUserBoolean ] = useState( false );

    const [ authError , setAuthErr ] = useState( [ false , '' ] );
    const [     error , setError   ] = useState( [ false , '' ] );

    const loginUserState = ( obj ) => {
        setUser( obj );
        setUserBoolean( true );
    }

    const logoutState = ( ) => {
        setUserBoolean( false );
        setUser( { } );
    }

    return (
        <AppContext.Provider value={ {
                  user , isUser  ,
                 error , setError ,
             authError , setAuthErr ,
        loginUserState , logoutState
        } }>

            { props.children }

        </AppContext.Provider>
    );
}

export default AppContextProvider;
