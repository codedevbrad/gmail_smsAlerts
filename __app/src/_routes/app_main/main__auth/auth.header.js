import React , { useContext } from 'react';
import { AppContext } from '../main__contexts/appContext';

import { userHandle } from './main__requests/request.user';

const Header = ( ) => {
    const { user , logoutState , setError } = useContext( AppContext );

    const logoutUser = ( ) => {
        userHandle.logoutUser()
            .then(  data => logoutState() )
            .catch(  err => setError( [ true , err ] ) );
    }

    return (
        <div>
            <p onClick={ () => logoutUser() }> logout  </p>
        </div>
    )
}

export default Header;
