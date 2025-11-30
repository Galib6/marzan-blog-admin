import { IBaseFilter } from '@base/interfaces';
import { AxiosSecureInstance } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { IArticleCreate, IArticleResponse, IArticleUpdate, ICategoriesResponse } from './interfaces';

const END_POINT: string = '/articles';

export const ArticleService = {
  NAME: END_POINT,
  async create(payload: IArticleCreate): Promise<IArticleResponse> {
    try {
      const data = await AxiosSecureInstance.post(END_POINT, payload);
      return Promise.resolve(data?.data);
    } catch (error) {
      responseHandlerFn(error);
      return error;
    }
  },
  async filter(options: IBaseFilter): Promise<ICategoriesResponse> {
    try {
      const data = await AxiosSecureInstance.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      responseHandlerFn(error);
      return error;
    }
  },
  async filterById(id: string): Promise<IArticleResponse> {
    try {
      const data = await AxiosSecureInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      responseHandlerFn(error);
      return error;
    }
  },
  async update(payload: IArticleUpdate): Promise<IArticleResponse> {
    try {
      const data = await AxiosSecureInstance.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(data?.data);
    } catch (error) {
      responseHandlerFn(error);
      return error;
    }
  },
  async delete(id: string): Promise<IArticleResponse> {
    try {
      const data = await AxiosSecureInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      responseHandlerFn(error);
      return error;
    }
  },
};
