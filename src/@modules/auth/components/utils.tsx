import { PermissionsTypes } from '@lib/constant';
import { storage } from '@lib/utils';
import { notification } from 'antd';
import jwtDecode from 'jwt-decode';
import React from 'react';

interface IRouteAuthorization {
  allowedAccess: PermissionsTypes[];
  component: any;
}
// export const RouteAuthorization: React.FC<IRouteAuthorization> = ({
//   allowedAccess,
//   component: Component,
// }) => {
//   let location = useLocation();
//   const hasAccess: boolean = hasAccessPermission(
//     allowedAccess,
//     getPermissions()
//   );
//   return hasAccess ? (
//     <Component />
//   ) : (
//     <Navigate to="/" state={{ from: location }} />
//   );
// };

export const Authorization: React.FC<{
  allowedAccess: PermissionsTypes[];
  children?: any;
  forbiddenFallback?: React.ReactNode;
}> = ({
  allowedAccess,
  children,
  forbiddenFallback = (
    <div className="h-full flex items-center justify-center">
      <h4 className="text-center text-8xl font-bold text-red-700">Unauthorized Access</h4>
    </div>
  ),
}) => {
  // const hasAccess: boolean = hasAccessPermission(
  //   allowedAccess,
  //   getPermissions()
  // );
  const hasAccess = true;
  //Temporary
  // return children;
  return hasAccess ? children : forbiddenFallback;
};

export const getAccess = (permissions: PermissionsTypes[], func: () => void) => {
  // const hasAccess: boolean = hasAccessPermission(permissions, getPermissions());
  const hasAccess: boolean = true;

  return hasAccess ? func() : notification.error({ message: 'Unauthorized Access', duration: 1 });
};

// Utility function to check if the user is authenticated
export const checkAuth = (): boolean => {
  const authToken = storage?.getToken();

  const loggedInUser: any = authToken ? jwtDecode(authToken) : { user: { email: null } };

  // Replace this logic with your actual authentication check
  const isAuthenticated: boolean = loggedInUser?.email ? true : false;
  return isAuthenticated;
};
