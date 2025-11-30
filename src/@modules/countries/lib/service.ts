import { IBaseFilter, IBaseResponse } from '@base/interfaces';
import { AxiosSecureInstance } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { ICountry, ICountryCreate, ICountryUpdate } from './interfaces';

const END_POINT: string = '/countries';

export const CountryService = {
  NAME: END_POINT,
  async create(payload: ICountryCreate): Promise<IBaseResponse<ICountry>> {
    try {
      const res = await AxiosSecureInstance.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async find(options: IBaseFilter): Promise<IBaseResponse<ICountry[]>> {
    try {
      const res = await AxiosSecureInstance.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async findById(id: string): Promise<IBaseResponse<ICountry>> {
    try {
      if (!id) return null;
      const res = await AxiosSecureInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async update(payload: ICountryUpdate): Promise<IBaseResponse<ICountry>> {
    try {
      const res = await AxiosSecureInstance.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async delete(id: string): Promise<IBaseResponse<ICountry>> {
    try {
      const res = await AxiosSecureInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
};
