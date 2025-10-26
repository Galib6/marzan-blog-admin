import { paths, publicPaths } from '@lib/constant';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { checkAuth } from './utils';

const WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        if (publicPaths.includes(router.pathname)) return setIsAuthenticated(true);
        const isAuthenticated = checkAuth();
        setIsAuthenticated(isAuthenticated);

        // Redirect to login page if user is not authenticated
        if (!isAuthenticated) return router.push(paths.auth.login);
      };

      fetchData();
    }, [router]);

    // Render the wrapped component if the user is authenticated and on the client-side
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  // Set the display name for easier debugging
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default WithAuth;
