import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from './auth.hook';

const Protected: React.FC = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push('/enter');
    }
  }, []);

  return <>{userId && children}</>;
};

export default Protected;
