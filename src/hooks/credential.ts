import { useState, useEffect } from 'react';

export type UserInfo = {
  id: string;
  name: string;
  email: string;
};

const useCredential = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const checkCredential = async () => {
      // Replace with actual logic to check if the user is logged in
      const loggedIn = await isLoggedIn();
      console.log('loggedIn', loggedIn)

      if (loggedIn) {
        // Replace with actual logic to fetch user info
        const user = await fetchUserInfo();
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    };

    checkCredential();
  }, []);

  const isLoggedIn = async (): Promise<boolean> => {
    // Replace with actual logic to check if the user is logged in
    // For example, check if a token exists in localStorage
    const token = localStorage.getItem('authToken');
    return !!token;
  };

  const fetchUserInfo = async (): Promise<UserInfo> => {
    // Replace with actual logic to fetch user info
    // For example, make an API call to get user info
    return {
      id: '123',
      name: 'Melvin',
      email: 'melvin@example.com',
    };
  };

  return userInfo;
};

export default useCredential;
