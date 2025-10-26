import { IBaseEntity, IBaseResponse } from '@modules/base/interfaces';

export interface IArticle extends IBaseEntity {
  description: string;
  isActive: boolean;
  orderPriority: number;
  slug: string;
  title: string;
  thumbUrl: string;
}

export interface IArticleCreate {
  description: string;
  isActive: boolean;
  orderPriority: number;
  slug: string;
  title: string;
  thumbUrl: string;
}

export interface IArticleUpdate {
  id: string;
  data: Partial<IArticleCreate>;
}

export interface IArticleResponse extends IBaseResponse {
  data: IArticle;
}

export interface IArticlesResponse extends IBaseResponse {
  data: IArticle[];
}
