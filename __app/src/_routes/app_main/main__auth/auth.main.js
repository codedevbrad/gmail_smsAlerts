import React , { useContext , useState , useEffect } from 'react';
import { AppContext } from '../main__contexts/appContext';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import Header from './auth.header.js';

function readUrlQueryString ( locationRead , urlId ) {
    const query = new URLSearchParams( locationRead );
    const url   = query.get( urlId );
    return url;
}

function getInitialState ( stateName , defaultValue ) {
    return localStorage.getItem( stateName || defaultValue);
}

function setInitialState ( stateName , value ) {
    return localStorage.setItem( stateName , value );
}

const Component__example1 = ( ) => {
    return (
      <div> component 1 </div>
    )
}

const Component__example2 = ( ) => {
    return (
      <div> component 2 </div>
    )
}

const Main__auth = ( { location } ) => {

    const { user } = useContext( AppContext );

    const [ component , setComponent ] = useState( 0 );

    const switchComponents = ( value ) => {
        let state = component;
        setInitialState( 'currentState' , value );
        setComponent( value );
    }

    useEffect( ( ) => {

        let state = getInitialState( 'currentState' , 0 );
        setComponent( state );
    } , [ ] );

    return (
        <div className="main__loggedIn">
              <Header />
              { JSON.stringify( user ) }

              <p onClick={ ( ) => switchComponents( 0 ) }> render component 1 </p>
              <p onClick={ ( ) => switchComponents( 1 ) }> render component 2 </p>

              { component == 0 && <Component__example1 /> }
              { component == 1 && <Component__example2 /> }

        </div>
    )
}

export default Main__auth;
