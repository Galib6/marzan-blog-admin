import { MutationConfig, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthServices } from './services';
import { clearAuthSession } from './utils/client';

export const useProfile = ({ config }: { config?: QueryConfig<typeof AuthServices.profile> }) => {
  const { queryKey, ...rest } = config ?? {};

  return useQuery({
    queryKey: [...(queryKey || []), AuthServices.NAME],
    queryFn: AuthServices.profile,
    ...rest,
  });
};

export const useSignIn = ({ config }: { config?: MutationConfig<typeof AuthServices.signIn> } = {}) => {
  return useMutation({
    mutationFn: AuthServices.signIn,
    ...config,
  });
};

export const usePasswordUpdate = ({
  config,
}: { config?: MutationConfig<typeof AuthServices.passwordUpdate> } = {}) => {
  return useMutation({
    mutationFn: AuthServices.passwordUpdate,
    onSettled: (data) => {
      if (!data?.success) return;
    },
    ...config,
  });
};

export const useSignOut = () => {
  clearAuthSession();
  window.location.reload();
};
