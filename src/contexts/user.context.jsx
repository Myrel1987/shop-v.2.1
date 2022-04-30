import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// this component is the actuall value you want to access externaly
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// this is the actual component that provide us the data that we want to access
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

//React-Context allows to store our data somewhere externaly and than passing it to the needed node
