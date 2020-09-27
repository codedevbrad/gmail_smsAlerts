import React , { createContext , useState } from 'react';

export const MainContext = createContext();

const MainContextProvider = ( props  ) => {
    const [ something , setSomething ] = useState( [ ] );

    return (
        <MainContext.Provider value={
          { something , setSomething }
        }>
            { props.children }

        </MainContext.Provider>
    );
}

export default MainContextProvider;
