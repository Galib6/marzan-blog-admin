import { IBaseEntity, TId } from '@base/interfaces';
import { ENUM_COUNTRY_VISA_TYPE } from './enums';

export interface ICountry extends IBaseEntity {
  title: string;
  visaType: keyof typeof ENUM_COUNTRY_VISA_TYPE;
  orderPriority: number;
}

export interface ICountryCreate {
  title: string;
  visaType: keyof typeof ENUM_COUNTRY_VISA_TYPE;
  orderPriority: number;
  isActive: boolean;
}

export interface ICountryUpdate {
  id: TId;
  data: Partial<ICountryCreate>;
}
