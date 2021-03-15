import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getDocumentCookie } from './auth.service';

const Protected: React.FC = ({ children }) => {
  const userId = getDocumentCookie('uid');
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push('/login');
    }
  }, []);

  return <>{userId && children}</>;
};

export default Protected;
