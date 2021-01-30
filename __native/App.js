// In App.js in a new project

import React , { useEffect , useContext }  from 'react';

import AppContextProvider from './src/contexts/globalContext';
import { AppContext }     from './src/contexts/globalContext';

import AppNavigator from './src/app_navigator';

function App() {
    return (
      <AppContextProvider>
        <AppNavigator />
      </AppContextProvider>
    );
}

export default App;
