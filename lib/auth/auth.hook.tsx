import { createContext, useEffect, useState } from 'react';
import { getDocumentCookie } from './auth.service';

export const AuthContext = createContext<ReturnType<typeof useAuth>>(null);

export const useAuth = () => {
  const [userId, setUserId] = useState<string>(null);
  const [authToken, setAuthToken] = useState<string>(null);

  useEffect(() => {
    setUserId(getDocumentCookie('uid'));
    setAuthToken(getDocumentCookie('auth'));
  });

  return { userId, authToken };
};
