import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoadingSuspense: React.FC<{ fallback: React.ComponentElement<any, any> }> = ({
  fallback,
  children,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setIsLoading(true));
    router.events.on('routeChangeComplete', () => setIsLoading(false));
  }, []);

  return <>{isLoading ? fallback : children}</>;
};

export default LoadingSuspense;
