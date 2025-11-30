import { IBaseResponse, TId } from '@base/interfaces';
import { TPermission, TRole } from '@lib/constant';

export interface IToken {
  user: {
    id: TId;
    roles: TRole[];
    permissions: TPermission[];
  };
  iat: number;
  exp: number;
}

export interface IPermissionToken {
  permissions: {
    permission: TPermission[];
    roles: string[];
  };
  iat: string;
  exp: string;
}

export interface ISignIn {
  identifier: string;
  password: string;
}

export interface ISignInSession {
  token: string;
  permissionToken: string;
}

export interface ISignInResponse extends IBaseResponse {
  data: ISignInSession;
}

export interface ISession {
  isLoading: boolean;
  isAuthenticate: boolean;
  user: IToken['user'];
  token: string;
}
