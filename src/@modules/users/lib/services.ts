import { IBaseResponse } from '@base/interfaces';
import { AxiosSecureInstance } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { IUser, IUserCreate, IUsersFilter, IUserUpdate } from './interfaces';

const END_POINT: string = '/users';

export const UsersService = {
  NAME: END_POINT,
  async create(payload: IUserCreate): Promise<IBaseResponse<IUser>> {
    try {
      const res = await AxiosSecureInstance.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async find(options: IUsersFilter): Promise<IBaseResponse<IUser[]>> {
    try {
      const res = await AxiosSecureInstance.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async findById(id: string): Promise<IBaseResponse<IUser>> {
    try {
      if (!id) return null;
      const res = await AxiosSecureInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async update(payload: IUserUpdate): Promise<IBaseResponse<IUser>> {
    try {
      const res = await AxiosSecureInstance.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async delete(id: string): Promise<IBaseResponse<IUser>> {
    try {
      const res = await AxiosSecureInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
};
