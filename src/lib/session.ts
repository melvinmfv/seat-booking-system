// src/lib/session.ts
export interface UserInfo {
  userId: string;
  username: string;
}

const USER_INFO_KEY = "userInfo";

export const saveUserInfo = (userInfo: UserInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

export const getUserInfo = (): UserInfo | null => {
  const userInfo = localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
};

export const clearUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
};
