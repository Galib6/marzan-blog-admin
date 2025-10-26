import { IBaseResponse } from "@modules/base/interfaces";

export interface IFlogin {
  email: string;
  password: string;
}

export interface ILoginResponse extends IBaseResponse {
  status: true;
  token;
}
