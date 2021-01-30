import React , { createContext , useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ( props  ) => {
    const [ user   , setUser  ] = useState( { } );
    const [ isUser , setUserBoolean ] = useState( false );
    const [ errors , setErrors ] = useState( false );

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
            user , setUser , isUser , setUserBoolean , errors , setErrors ,
            loginUserState , logoutState
        } }>

            { props.children }

        </AppContext.Provider>
    );
}

export default AppContextProvider;
