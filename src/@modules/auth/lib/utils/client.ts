'use client';

import { Env } from '.environments';
import { Permissions, Roles, TPermission, TRole } from '@lib/constant';
import { Cookies, getNotificationInstance } from '@lib/utils';
import type { MenuProps, TableColumnsType } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { Tab } from 'rc-tabs/lib/interface';
import { useEffect, useState } from 'react';
import { AUTH_TOKEN_KEY, PERMISSION_TOKEN_KEY } from '../constant';
import { IPermissionToken, ISession, ISignInSession, IToken } from '../interfaces';

let sessionCache: ISession = null;
let sessionUserCache: ISession['user'] = null;
export const unAuthorizeSession: ISession = {
  isLoading: false,
  isAuthenticate: false,
  user: null,
  token: null,
};

export const getAuthSession = (): ISession => {
  if (typeof window === 'undefined') return { ...unAuthorizeSession, isLoading: true };

  if (sessionCache && !isJwtExpire(sessionCache.token)) return sessionCache;

  try {
    const token = Cookies.getData(AUTH_TOKEN_KEY);

    if (!token) {
      return unAuthorizeSession;
    } else {
      const tokenDec: IToken = jwtDecode(token);
      const isExpire = isJwtExpire(tokenDec);

      if (isExpire) {
        return unAuthorizeSession;
      } else {
        const session = {
          isLoading: false,
          isAuthenticate: true,
          user: {
            ...tokenDec.user,
          },
          token,
        };

        sessionCache = session;
        sessionUserCache = session.user;
        return session;
      }
    }
  } catch {
    return unAuthorizeSession;
  }
};

export const setAuthSession = (session: ISignInSession): ISession => {
  if (typeof window === 'undefined') return { ...unAuthorizeSession, isLoading: true };

  try {
    const token = session.token;
    const permissionToken = session.permissionToken;

    if (!token) {
      return unAuthorizeSession;
    } else {
      const tokenDec: IToken = jwtDecode(token);
      const tokenExp = new Date(tokenDec.exp * 1000);

      sessionCache = null;
      sessionUserCache = null;
      Cookies.setData(AUTH_TOKEN_KEY, token, tokenExp);
      Cookies.setData(PERMISSION_TOKEN_KEY, permissionToken, tokenExp);

      return {
        isLoading: false,
        isAuthenticate: true,
        user: {
          ...tokenDec.user,
        },
        token,
      };
    }
  } catch {
    return unAuthorizeSession;
  }
};

export const clearAuthSession = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    Cookies.removeData(AUTH_TOKEN_KEY);
    return true;
  } catch {
    return false;
  }
};

export const useAuthSession = (): ISession => {
  const [session, setSession] = useState<ISession>({
    ...unAuthorizeSession,
    isLoading: true,
  });

  useEffect(() => {
    setSession(getAuthSession());
  }, []);

  return session;
};

export const getAuthToken = (): string => {
  if (typeof window === 'undefined') return null;

  try {
    const token = Cookies.getData(AUTH_TOKEN_KEY);
    return token;
  } catch {
    return null;
  }
};
export const getPermissionToken = (): string => {
  if (typeof window === 'undefined') return null;

  try {
    const token = Cookies.getData(PERMISSION_TOKEN_KEY);
    return token;
  } catch {
    return null;
  }
};

export const isJwtExpire = (token: string | IToken): boolean => {
  let holdToken = null;

  if (typeof token === 'string') holdToken = jwtDecode(token);
  else holdToken = token;

  if (!holdToken?.exp) return true;
  else {
    const expDate: Date = new Date(holdToken.exp * 1000);

    if (expDate > new Date()) return false;
    else return true;
  }
};

export const getPermissions = (): TPermission[] => {
  try {
    const token = getPermissionToken();
    if (token) {
      const tokenDec: IPermissionToken = jwtDecode(token);
      return tokenDec?.permissions?.permission ?? [];
    } else {
      return [];
    }
  } catch {
    return [];
  }
};

export const hasAccessPermission = (allowedAccess: TPermission[]): boolean => {
  if (!sessionUserCache) {
    getAuthSession();
  }
  if (Env.isEnableRBAC === 'false') return true;
  else if (sessionUserCache?.roles?.includes(Roles.SUPER_ADMIN)) return true;
  else {
    const permissions: TPermission[] = [...getPermissions(), Permissions.FORBIDDEN];
    const hasAccess = permissions.some((permission) => allowedAccess.includes(permission));
    return hasAccess;
  }
};

type MenuItem = Required<MenuProps>['items'][number];
export type IRbacMenuItems = MenuItem & {
  allowedAccess?: TPermission[];
  children?: IRbacMenuItems[];
};

interface CompatibilityProps {
  destroyInactiveTabPane?: boolean;
  destroyOnHidden?: boolean;
}

export type IRbacTabItems = (Omit<Tab, 'destroyInactiveTabPane'> & CompatibilityProps) & {
  allowedAccess?: TPermission[];
};

export const getRbacMenuItems = (menuItems: IRbacMenuItems[]): MenuItem[] => {
  const items = menuItems.map((item) => {
    const hasAccess = item?.allowedAccess ? hasAccessPermission(item.allowedAccess) : true;
    if (hasAccess) {
      const children = item.children ? getRbacMenuItems(item.children) : null;
      delete item.allowedAccess;
      return { ...item, children };
    }
    return null;
  });
  return items.filter((x) => x);
};

export const getRbacTabItems = (
  menuItems: IRbacTabItems[],
): (Omit<Tab, 'destroyInactiveTabPane'> & CompatibilityProps)[] => {
  const items = menuItems.map((item) => {
    const hasAccess = item?.allowedAccess ? hasAccessPermission(item.allowedAccess) : true;
    if (hasAccess) {
      return { ...item };
    }
    return null;
  });
  return items.filter((x) => x);
};

export const getAccess = (
  allowedAccess: TPermission[],
  func: () => void,
  message = 'Unauthorized Access!',
) => {
  const notification = getNotificationInstance();
  const hasAccess: boolean = hasAccessPermission(allowedAccess);
  return hasAccess ? func() : notification.error({ message });
};

interface GetContentAccess<Record> {
  content: Record;
  allowedAccess: TPermission[];
  fallback?: Record;
}
export function getContentAccess<Record = any>({
  content,
  allowedAccess,
  fallback = null,
}: GetContentAccess<Record>): Record {
  const hasAccess: boolean = hasAccessPermission(allowedAccess);
  if (hasAccess) return content;
  return fallback;
}

interface IGetColumnsAccess<Record> {
  allowedAccess: TPermission[];
  columns: TableColumnsType<Record>;
}

export const getColumnsAccess = <Record = any>({
  allowedAccess,
  columns,
}: IGetColumnsAccess<Record>): TableColumnsType<Record> => {
  const hasAccess: boolean = hasAccessPermission(allowedAccess);

  return hasAccess ? columns : [];
};

type TMenuItem = Required<MenuProps>['items'][number];
export type TMenuItems = TMenuItem & {
  allowedAccess?: TPermission[];
  children?: TMenuItems[];
};

export const getMenuItemsAccess = (menuItems: TMenuItems[]): TMenuItem[] => {
  const items = menuItems.map((item) => {
    const hasAccess = item?.allowedAccess ? hasAccessPermission(item.allowedAccess) : true;

    if (hasAccess) {
      const children = item.children ? getMenuItemsAccess(item.children) : null;
      delete item.allowedAccess;

      return { ...item, children };
    } else {
      return null;
    }
  });

  return items.filter((x) => x);
};

export const hasAccessByRoles = (allowedRoles: TRole[], disallowedRoles: TRole[]): boolean => {
  if (Env.isEnableRBAC === 'false') return true;
  else if (sessionUserCache?.roles?.includes(Roles.SUPER_ADMIN)) return true;
  else {
    let hasAccess = false;
    const roles = sessionUserCache?.roles ?? [];

    if (allowedRoles.length) hasAccess = roles.some((role) => allowedRoles.includes(role));
    if (disallowedRoles.length) hasAccess = roles.some((role) => !disallowedRoles.includes(role));

    return hasAccess;
  }
};

interface IGetNodeByRoles {
  node: React.ReactNode;
  allowedRoles?: TRole[];
  disallowedRoles?: TRole[];
  fallBack?: React.ReactNode;
}

export const getNodeByRoles = ({
  node,
  allowedRoles = [],
  disallowedRoles = [],
  fallBack = null,
}: IGetNodeByRoles): React.ReactNode => {
  const hasAccess: boolean = hasAccessByRoles(allowedRoles, disallowedRoles);

  return hasAccess ? node : fallBack || null;
};

interface IGetColumnsByRoles<Record> {
  columns: TableColumnsType<Record>;
  allowedRoles?: TRole[];
  disallowedRoles?: TRole[];
}

export const getColumnsByRoles = <Record = any>({
  columns,
  allowedRoles = [],
  disallowedRoles = [],
}: IGetColumnsByRoles<Record>): TableColumnsType<Record> => {
  const hasAccess: boolean = hasAccessByRoles(allowedRoles, disallowedRoles);

  return hasAccess ? columns : [];
};

interface IGetContentByRoles<Record> {
  content: Record;
  allowedRoles?: TRole[];
  disallowedRoles?: TRole[];
}

export const getContentByRoles = <Record = any>({
  content,
  allowedRoles = [],
  disallowedRoles = [],
}: IGetContentByRoles<Record>): Record => {
  const hasAccess: boolean = hasAccessByRoles(allowedRoles, disallowedRoles);

  return hasAccess ? content : null;
};
