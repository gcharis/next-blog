import { createContext, useEffect, useState } from 'react';
import { clearAuthCookies, deleteDocumentCookie, getDocumentCookie } from './auth.service';

export const AuthContext = createContext<ReturnType<typeof useAuth>>(null);

export const useAuth = () => {
  const [userId, setUserId] = useState<string>(null);
  const [authToken, setAuthToken] = useState<string>(null);
  const [username, setUsername] = useState<string>(null);

  useEffect(() => {
    const uid = getDocumentCookie('uid');
    const jwt = getDocumentCookie('auth');
    const username = getDocumentCookie('username');

    if (!jwt || !uid || !username) {
      clearAuthCookies();

      setUserId(null);
      setAuthToken(null);
      setUsername(null);
    } else {
      setUserId(uid);
      setAuthToken(jwt);
      setUsername(username);
    }
  });

  return { userId, authToken, username };
};
