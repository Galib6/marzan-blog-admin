import { FormInstance } from 'antd/lib/form';
import { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import jwtDecode from 'jwt-decode';

import { storage } from './_storage-function';

export class toolbox {
  public static appendPagination(path: string, page = 1, limit = 10) {
    return `${path}?page=${page}&limit=${limit}`;
  }

  public static jwtDecodeFunction(code: string) {
    return jwtDecode(code);
  }

  public static isJwtExpired(tokens: number): boolean {
    const date: Date = new Date(tokens * 1000);
    const parsedDate = Date.parse(date.toString());
    if (parsedDate - Date.now() > 0) {
      return false;
    } else {
      return true;
    }
  }

  public static getSerializeData(data: any[]) {
    const serializeData = data?.sort((a, b) => a.serial - b.serial);
    return serializeData;
  }

  public static getSerializeDataById(data: any[]) {
    const serializeData = data?.sort((a, b) => a.id - b.id);
    return serializeData;
  }

  static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  public static isValidArray(value: any): boolean {
    return Array.isArray(value) && value.length > 0;
  }

  public static isValidObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  public static toSafeValue(value: any): any {
    if (toolbox.isNotEmpty(value)) {
      return value;
    }
    return '';
  }

  public static randomString(length: number, type: 'lower' | 'upper' | 'numeric'): string {
    let result = '';
    const characters =
      type === 'lower'
        ? 'abcdefghijklmnopqrstuvwxyz'
        : type === 'upper'
        ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        : type === 'numeric'
        ? '0123456789'
        : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static isValidString(value: any): boolean {
    return typeof value === 'string' && value.length > 0;
  }

  public static isValidNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }

  public static isValidBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  //is not empty
  public static isNotEmpty(value: any): boolean {
    return value !== null && value !== undefined && value !== '' && value.length !== 0;
  }

  public static toNumber(value: any): number {
    return Number(value);
  }

  //safety convert to number
  public static toSafeNumber(value: any): number {
    if (toolbox.isNotEmpty(value)) {
      return Number(value);
    }
    return 0;
  }

  //safety convert to string
  public static toSafeString(value: any): string {
    if (toolbox.isNotEmpty(value)) {
      return value.toString();
    }
    return '';
  }

  public static toSafeObject(value: any): any {
    if (toolbox.isNotEmpty(value)) {
      return value;
    }
    return {};
  }

  //safety convert to boolean
  public static toBooleanSafe(value: any): boolean {
    if (toolbox.isNotEmpty(value)) {
      return value.toString() === 'true';
    }
    return false;
  }

  public static findMax(array: number[]): number {
    return Math.max.apply(Math, array);
  }

  public static findMin(array: number[]): number {
    return Math.min.apply(Math, array);
  }

  public static findAverage(array: number[]): number {
    let sum = 0;
    for (const value of array) {
      sum += value;
    }
    return sum / array.length;
  }

  public static findMedian(array: number[]): number {
    const sorted = array.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  public static isEmpty(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      value === 'null' ||
      value === 'undefined'
    );
  }

  //to safe array
  public static toSafeArray(value: any): any[] {
    if (toolbox.isNotEmpty(value)) {
      return value;
    }
    return [];
  }

  public static toCleanObject(obj: { [key: string]: any }): any {
    if (toolbox.isValidObject(obj)) {
      Object.keys(obj).forEach((key) => {
        if (toolbox.isEmpty(obj[key])) {
          delete obj[key];
        }
      });
    }
    return toolbox.toSafeObject(obj);
  }

  // params query normalize to url query
  public static toQueryString(params: any): string {
    if (toolbox.isValidObject(params)) {
      return Object.keys(params)
        .map((key) => {
          return key + '=' + params[key];
        })
        .join('&');
    }
    return '';
  }

  public static queryNormalizer = (options: any) => {
    const pureOption = toolbox.toCleanObject(options);

    if (pureOption?.query) {
      return options.query;
    }
    const queries: any = [];
    Object.entries(pureOption).map(([key, value]: any) => {
      const valueType = Array.isArray(value) ? 'array' : typeof value;
      if (valueType === 'array' || key === 'filter' || key === 'sort') {
        return value.map((fOption) => {
          return queries.push(`${key}=${fOption}`);
        });
      } else if (valueType === 'object') {
        return queries.push(`${key}=${JSON.stringify(value)}`);
      } else {
        return queries.push(`${key}=${value}`);
      }
    });
    return queries.join('&');

    //   if (options?.query) {
    //     return options.query;
    //   }
    //   if (options) {
    //     const items = {};
    //     Object.keys(options).map((x) => {
    //       if (Boolean(options[x])) {
    //         items[x] = options[x];
    //       }
    //     });
    //     return Object.keys(items)
    //       .map((x) => {
    //         const propertyName = x;
    //         const propertyValue = items[x];
    //         const propertyValueType = typeof items[x];
    //         if (propertyValueType === 'object') {
    //           return `${propertyName}=${JSON.stringify(propertyValue)}`;
    //         } else {
    //           return `${propertyName}=${propertyValue}`;
    //         }
    //       })
    //       .join('&');
    //   }

    //   return '';
    // };
  };

  // is valid browser url
  public static isValidBrowserUrl(url: string): boolean {
    // check is string
    if (typeof url !== 'string') {
      return false;
    }
    return url?.startsWith('http://') || url?.startsWith('https://');
  }

  // check url ending extension
  public static isValidSvgUrl(url: string): boolean {
    // check is string
    if (typeof url !== 'string') {
      return false;
    }
    return url?.toLocaleLowerCase()?.endsWith('.svg');
  }

  // amount prefix with currency symbol
  public static amountPrefixWithCurrencySymbol = (amount: number, currencySymbol: string = '৳'): string => {
    return currencySymbol + toolbox.toSafeNumber(amount);
  };

  // purify data if json stringfy object
  public static jsonParser = (data: any): any => {
    const r = toolbox.isJsonString(data);
    return r ? JSON.parse(data) : data;
  };

  // is json string
  public static isJsonString = (str: string): boolean => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  // clean svg code from xml version tag
  public static cleanSvgCode = (svgCode: string): string => {
    return svgCode.replace(/<\?xml[^>]*>/g, '');
  };

  public static orderStatusBgColorGen = (status: string) => {
    switch (status) {
      case 'PLACED':
        return '#FFA500';
      case 'CONFIRMED':
        return '#2CADD6';
      case 'COMPLETED':
        return '#00AC26';
      case 'CANCELED':
        return '#D62C2C';
      default:
        return '#00AC26';
    }
  };
  public static errorHandler = (error: AxiosError) => {
    const { response } = error;
    switch (
      response?.status
      // case ResponseCode.SUCCESS:
      //   return Failure(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
      // case ResponseCode.NO_CONTENT:
      //   return Failure(ResponseCode.NO_CONTENT, ResponseMessage.NO_CONTENT);
      // case ResponseCode.BAD_REQUEST:
      //   return Failure(ResponseCode.BAD_REQUEST, ResponseMessage.BAD_REQUEST);
      // case ResponseCode.FORBIDDEN:
      //   return Failure(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN);
      // case ResponseCode.UNAUTHORISED:
      //   return Failure(ResponseCode.UNAUTHORISED, ResponseMessage.UNAUTHORISED);
      // case ResponseCode.NOT_FOUND:
      //   return Failure(ResponseCode.NOT_FOUND, ResponseMessage.NOT_FOUND);
      // case ResponseCode.INTERNAL_SERVER_ERROR:
      //   return Failure(
      //     ResponseCode.INTERNAL_SERVER_ERROR,
      //     ResponseMessage.INTERNAL_SERVER_ERROR
      //   );
      // default:
      //   return Failure(ResponseCode.DEFAULT, ResponseMessage.DEFAULT);
    ) {
    }
  };
  public static toSlugify = (slug: string) => {
    if (!slug) return '';
    return slug?.toLowerCase().split(' ').join('-');
  };

  public static fromSlugify = (slug: string) => {
    if (!slug) return '';
    const words = slug.split('-');
    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  };

  public static getTokenData = (): {
    user: {
      id: number;
      email: string;
      roles: string[];
    };
    iat: number;
    exp: number;
  } => jwtDecode(storage.getToken());

  public static getPureRelationship(relation: string, prefix?: string) {
    let pureRelation =
      relation?.toLowerCase() === 'myself' || relation?.toLowerCase() === "myself's"
        ? prefix
          ? prefix
          : relation
        : `${prefix ? prefix : 'My'} ${relation}`;

    return pureRelation;
  }

  public static toDayjs = (date: string, format = 'YYYY-MM-DD'): Dayjs => {
    return date ? dayjs(date, format) : null;
  };
  public static dayjsToStr = (date: string, format = 'YYYY-MM-DD'): string => {
    return date ? dayjs(date).format(format) : null;
  };

  public static styleManager = {
    setProperty(property: string, value: string) {
      if (typeof window === 'undefined' || !property || !value) return;
      document.documentElement.style.setProperty(property, value);
      return;
    },
    getPropertyValue(property: string) {
      if (typeof window === 'undefined' || !property) return;
      const value = document.documentElement.style.getPropertyValue(property);
      return value;
    },
  };
  public static UctTimeToCurrentTimeConverter(time: string) {
    const givenTime = new Date(time);
    const currentTime = new Date();
    const durationInMilliseconds = Number(givenTime) - Number(currentTime);
    const absoluteDurationInMilliseconds = Math.abs(durationInMilliseconds);
    const isFutureTime = durationInMilliseconds > 0;
    const durationInSeconds = Math.floor(absoluteDurationInMilliseconds / 1000);
    if (isFutureTime) {
      return durationInSeconds;
    }
    return 0;
  }
  public static timeDuration(start: string, end: string) {
    const endTime = new Date(end);
    const startTime = new Date(start);
    const durationInMilliseconds = Number(endTime) - Number(startTime);
    const absoluteDurationInMilliseconds = Math.abs(durationInMilliseconds);
    const isFutureTime = durationInMilliseconds > 0;
    const durationInSeconds = Math.round(absoluteDurationInMilliseconds / 1000);
    if (isFutureTime) {
      return durationInSeconds;
    }
    return 0;
  }
  public static removeSpace(name: string): string {
    const lowerCaseName = name.toLowerCase();
    const words = lowerCaseName.split(' ');
    return words.join('-');
  }
  public static generateSlug = (form: FormInstance, selector: string, target: string) => {
    const title = form.getFieldValue(selector);
    const sanitizedTitle = title?.replace(/[^a-zA-Z0-9\s]+/g, '');
    const trimmedTitle = sanitizedTitle?.trim();
    const slug = trimmedTitle?.toLowerCase().trim().replace(/\s+/g, '-').replace(/-+/g, '-').split("'").join('');
    form.setFieldValue(target, slug);
  };
}
