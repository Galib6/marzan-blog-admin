import { coreAxiosInstance } from "@lib/config";
import { IFlogin, ILoginResponse } from "./interface";

const END_POINT = "/auth";

export const AuthService = {
  async login(payload: IFlogin): Promise<ILoginResponse> {
    try {
      const data = await coreAxiosInstance.post(
        `${END_POINT}/admin-login`,
        payload
      );
      return data?.data;
    } catch (error) {}
  },
};
