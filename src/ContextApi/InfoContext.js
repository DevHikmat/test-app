import React, { useContext, useState } from "react";

const InfoContext = React.createContext();

export const useInfoContext = () => useContext(InfoContext);

export const InfoContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    login: false,
    info: {},
  });
  const [loading, setLoading] = useState(false);

  const state = {
    userInfo,
    setUserInfo,
    loading,
    setLoading
  };

  return (
    <InfoContext.Provider value={state}>
      <InfoContext.Consumer>
        {(userInfo, setUserInfo, loading, setLoading) => children}
      </InfoContext.Consumer>
    </InfoContext.Provider>
  );
};
