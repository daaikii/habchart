import React, { useContext, createContext, useState } from "react";

type Opetype = {
  login: (authUser: any) => void;
  logout: () => void;
  updateUserProfile: (authUser: any) => void;
};

type USER = {
  uid: string;
  photoURL: string;
  displayName: string;
};

export const AuthContext = createContext<USER>({
  uid: "",
  photoURL: "",
  displayName: "",
});

export const AuthOpeContext = createContext<Opetype>({
  login: () => console.error("Providerを指定してください"),
  logout: () => console.error("Providerを指定してください"),
  updateUserProfile: () => console.error("Providerを指定してください"),
});

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<USER>({
    uid: "",
    photoURL: "",
    displayName: "",
  });

  const login = (authUser: any) =>
    setUser({
      uid: authUser.uid,
      photoURL: authUser.photoURL,
      displayName: authUser.displayName,
    });

  const logout = () => {
    setUser({
      uid: "",
      photoURL: "",
      displayName: "",
    });
  };
  const updateUserProfile = (authUser: any) =>
    setUser({
      uid: authUser.uid,
      photoURL: authUser.photoURL,
      displayName: authUser.displayName,
    });

  return (
    <AuthOpeContext.Provider value={{ login, logout, updateUserProfile }}>
      <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    </AuthOpeContext.Provider>
  );
};

export const useLogin = () => useContext(AuthOpeContext).login;
export const useLogout = () => useContext(AuthOpeContext).logout;
export const useUpdateUserProfile = () => useContext(AuthOpeContext).updateUserProfile;

export default UserProvider;
