import { IBaseEntity, IBaseResponse, TId } from '@base/interfaces';

export interface IArticle extends IBaseEntity {
  title: string;
  name: string;
  slug: string;
  summary: string;
  thumb: string;
  content: any;
  categories: { id: string }[];
  orderPriority: number;
  isActive: boolean;
}

export interface IArticleCreate {
  title?: string;
  name?: string;
  slug?: string;
  summary?: string;
  thumb?: string;
  content?: any;
  categories?: { id: string }[];
  orderPriority?: number;
  isActive?: boolean;
}

export interface IArticleUpdate {
  id: TId;
  data: IArticleCreate;
}

export interface IArticleResponse extends IBaseResponse {
  data: IArticle;
}

export interface ICategoriesResponse extends IBaseResponse {
  data: IArticle[];
}
