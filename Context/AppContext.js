import React from 'react';
const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [currentUser, setCurrentUser] = React.useState([]);
  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};
