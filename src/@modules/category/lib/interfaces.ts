import { IBaseEntity, IBaseResponse, TId } from '@base/interfaces';

export interface ICategory extends IBaseEntity {
  title: string;
  description: string;
  image: string;
  orderPriority: number;
  isActive: boolean;
}

export interface ICategoryCreate {
  title?: string;
  description?: string;
  image?: string;
  orderPriority?: number;
  isActive?: boolean;
}

export interface ICategoryUpdate {
  id: TId;
  data: ICategoryCreate;
}

export interface ICategoryResponse extends IBaseResponse {
  data: ICategory;
}

export interface ICategoriesResponse extends IBaseResponse {
  data: ICategory[];
}
