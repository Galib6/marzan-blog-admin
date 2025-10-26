import { coreAxiosInstance } from "@lib/config";
import { toolbox } from "@lib/utils";
import { IBaseFilter, IdType } from "@modules/base/interfaces";
import {
  IArticleCategoryCreate,
  IArticleCategoryResponse,
  IArticleCategorysResponse,
  IArticleCategoryUpdate,
} from "./interface";

const END_POINT: string = "/article-category";

export const ArticleCategoryService = {
  NAME: END_POINT,
  async filter(options: IBaseFilter): Promise<IArticleCategorysResponse> {
    try {
      const data = await coreAxiosInstance.get(
        `${END_POINT}?${toolbox.queryNormalizer(options)}`
      );
      return Promise.resolve(data?.data);
    } catch (error) {
      toolbox.errorHandler(error);
      return error;
    }
  },
  async filterById(id: IdType): Promise<IArticleCategoryResponse> {
    try {
      if (!id) return { data: null } as any;
      const data = await coreAxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      toolbox.errorHandler(error);
      return error;
    }
  },
  async create(
    payload: IArticleCategoryCreate
  ): Promise<IArticleCategoryResponse> {
    try {
      const data = await coreAxiosInstance.post(END_POINT, payload);
      return Promise.resolve(data?.data);
    } catch (error) {
      toolbox.errorHandler(error);
      return error;
    }
  },
  async update(
    payload: IArticleCategoryUpdate
  ): Promise<IArticleCategoryResponse> {
    try {
      const data = await coreAxiosInstance.patch(
        `${END_POINT}/${payload.id}`,
        payload.data
      );
      return Promise.resolve(data?.data);
    } catch (error) {
      toolbox.errorHandler(error);
      return error;
    }
  },
  async delete(id: string): Promise<IArticleCategoryResponse> {
    try {
      const data = await coreAxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      toolbox.errorHandler(error);
      return error;
    }
  },
};
