import { MutationConfig } from "@lib/config";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "./service";

//---------------- useLogin hook ------------------------------------
type IUseLogin = {
  config?: MutationConfig<typeof AuthService.login>;
};
export const useLogin = ({ config }: IUseLogin = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.login,
  });
};
