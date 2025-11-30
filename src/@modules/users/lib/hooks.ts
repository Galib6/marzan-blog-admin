import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IUsersFilter } from './interfaces';
import { UsersService } from './services';

//---------------- useUserss hook ------------------------------------
type IUseUsers = {
  options: IUsersFilter;
  config?: QueryConfig<typeof UsersService.find>;
};
export const useUsers = ({ options, config }: IUseUsers) => {
  return useQuery({
    ...config,
    queryKey: [UsersService.NAME, options],
    queryFn: () => UsersService.find(options),
  });
};

//----------------------- useUser hook --------------------------------------
type IUseUser = {
  id: string;
  config?: QueryConfig<typeof UsersService.findById>;
};

export const useUser = ({ id, config }: IUseUser) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => UsersService.findById(id),
  });
};

//------------------ useUserCreate hook ---------------------------------
type IUseUserCreate = {
  config?: MutationConfig<typeof UsersService.create>;
};

export const useUserCreate = ({ config }: IUseUserCreate = {}) => {
  return useMutation({
    ...config,
    mutationFn: UsersService.create,
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({
        queryKey: [UsersService.NAME],
      });
    },
  });
};

//------------------ useUserUpdate hook ----------------------------------
type IUseUserUpdate = {
  config?: MutationConfig<typeof UsersService.update>;
};

export const useUserUpdate = ({ config }: IUseUserUpdate = {}) => {
  return useMutation({
    ...config,
    mutationFn: UsersService.update,
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({
        queryKey: [UsersService.NAME],
      });
    },
  });
};

//------------------ useUserDelete hook ----------------------------------
type IUseUserDelete = {
  config?: MutationConfig<typeof UsersService.delete>;
};

export const useUserDelete = ({ config }: IUseUserDelete = {}) => {
  return useMutation({
    ...config,
    mutationFn: UsersService.delete,
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({
        queryKey: [UsersService.NAME],
      });
    },
  });
};
