import { IBaseEntity, IBaseFilter, IBaseResponse, TId } from '@base/interfaces';

export interface IUsersFilter extends IBaseFilter {}

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  roles: ({ roleId: TId; title: string; userId: TId } & IBaseEntity)[];
}

export interface IUsersResponse extends IBaseResponse {
  data: IUser[];
}

export interface IUserCreate {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  roles: { role?: TId; isDeleted?: boolean }[];
  isActive: boolean;
}

export interface IUserUpdate {
  id: string | number;
  data: Partial<IUserCreate>;
}
