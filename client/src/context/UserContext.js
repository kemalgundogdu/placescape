import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState(() => {
    const savedUserId = localStorage.getItem("userID");
    if (savedUserId) return savedUserId;
    const newId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem("userID", newId);
    return newId;
  });

  const values = [userID, setUserID];

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
