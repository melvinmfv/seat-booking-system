// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserInfo, getUserInfo, saveUserInfo, clearUserInfo as clearSessionUserInfo } from '../lib/session';

interface UserContextProps {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUserInfo = getUserInfo();
    if (storedUserInfo) {
      setUserInfoState(storedUserInfo);
    }
  }, []);

  const setUserInfo = (userInfo: UserInfo) => {
    saveUserInfo(userInfo);
    setUserInfoState(userInfo);
  };

  const clearUserInfo = () => {
    clearSessionUserInfo();
    setUserInfoState(null);
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, clearUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};