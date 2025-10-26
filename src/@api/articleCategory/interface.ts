import { IBaseEntity, IBaseResponse } from '@modules/base/interfaces';

export interface IArticleCategory extends IBaseEntity {
  description: string;
  isActive: boolean;
  orderPriority: number;
  slug: string;
  title: string;
}

export interface IArticleCategoryCreate {
  description: string;
  isActive: boolean;
  orderPriority: number;
  slug: string;
  title: string;
}

export interface IArticleCategoryUpdate {
  id: string;
  data: Partial<IArticleCategoryCreate>;
}

export interface IArticleCategoryResponse extends IBaseResponse {
  data: IArticleCategory;
}

export interface IArticleCategorysResponse extends IBaseResponse {
  data: IArticleCategory[];
}
