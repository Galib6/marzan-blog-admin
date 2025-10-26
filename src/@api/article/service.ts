import { coreAxiosInstance } from '@lib/config';
import { toolbox } from '@lib/utils';
import { IBaseFilter, IdType } from '@modules/base/interfaces';
import { IArticleCreate, IArticleResponse, IArticleUpdate, IArticlesResponse } from './interfaces';

const END_POINT: string = '/article';

export const ArticleService = {
  NAME: END_POINT,
  async filter(options: IBaseFilter): Promise<IArticlesResponse> {
    try {
      const data = await coreAxiosInstance.get(`${END_POINT}?${toolbox.queryNormalizer(options)}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      toolbox.errorHandler(error);
      return error;
    }
  },
  async filterById(id: IdType): Promise<IArticleResponse> {
    try {
      if (!id) return { data: null } as any;
      const data = await coreAxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      toolbox.errorHandler(error);
      return error;
    }
  },
  async create(payload: IArticleCreate): Promise<IArticleResponse> {
    try {
      const data = await coreAxiosInstance.post(END_POINT, payload);
      return Promise.resolve(data?.data);
    } catch (error) {
      toolbox.errorHandler(error);
      return error;
    }
  },
  async update(payload: IArticleUpdate): Promise<IArticleResponse> {
    try {
      const data = await coreAxiosInstance.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(data?.data);
    } catch (error) {
      toolbox.errorHandler(error);
      return error;
    }
  },
  async delete(id: string): Promise<IArticleResponse> {
    try {
      const data = await coreAxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      toolbox.errorHandler(error);
      return error;
    }
  },
};
