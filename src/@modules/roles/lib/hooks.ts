import { IBaseFilter, TId } from '@base/interfaces';
import { InfiniteQueryConfig, MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { RolesServices } from './services';

export const useRoleFindById = ({
  id,
  config,
}: {
  id: TId;
  config?: QueryConfig<typeof RolesServices.findById>;
}) => {
  const { queryKey, ...rest } = config ?? {};

  return useQuery({
    queryKey: [...(queryKey || []), RolesServices.NAME, id],
    queryFn: () => RolesServices.findById(id),
    ...rest,
  });
};

export const useRoleFind = ({
  options,
  config,
}: {
  options: IBaseFilter;
  config?: QueryConfig<typeof RolesServices.find>;
}) => {
  const { queryKey, ...rest } = config ?? {};

  return useQuery({
    queryKey: [...(queryKey || []), RolesServices.NAME, options],
    queryFn: () => RolesServices.find(options),
    ...rest,
  });
};

export const useRoleFindInfinite = ({
  options,
  config,
}: {
  options: IBaseFilter;
  config?: InfiniteQueryConfig<typeof RolesServices.find>;
}) => {
  const { queryKey, ...rest } = config ?? {};

  return useInfiniteQuery({
    queryKey: [...(queryKey || []), RolesServices.NAME, options],
    queryFn: ({ pageParam }) => RolesServices.find({ ...options, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((count, page) => count + page.data.length, 0);
      return totalFetched < lastPage.meta.total ? lastPage.meta.page + 1 : null;
    },
    ...rest,
  });
};

export const useRoleFindSpecifics = ({
  config,
}: { config?: MutationConfig<typeof RolesServices.findSpecifics> } = {}) => {
  return useMutation({
    mutationFn: RolesServices.findSpecifics,
    onSettled: (data) => {
      if (!data?.success) return;
    },
    ...config,
  });
};

export const useRoleCreate = ({ config }: { config?: MutationConfig<typeof RolesServices.create> } = {}) => {
  return useMutation({
    mutationFn: RolesServices.create,
    onSettled: (data) => {
      if (!data?.success) return;

      queryClient.invalidateQueries({ queryKey: [RolesServices.NAME] });
    },
    ...config,
  });
};

export const useRoleUpdate = ({ config }: { config?: MutationConfig<typeof RolesServices.update> } = {}) => {
  return useMutation({
    mutationFn: RolesServices.update,
    onSettled: (data) => {
      if (!data?.success) return;

      queryClient.invalidateQueries({ queryKey: [RolesServices.NAME] });
    },
    ...config,
  });
};

export const useRoleFindAvailablePermissionsById = ({
  id,
  config,
  options,
}: {
  id: TId;
  config?: QueryConfig<typeof RolesServices.findAvailablePermissionsById>;
  options: IBaseFilter;
}) => {
  const { queryKey, ...rest } = config ?? {};

  return useQuery({
    queryKey: [...(queryKey || []), RolesServices.NAME, id, 'ap', options],
    queryFn: () => RolesServices.findAvailablePermissionsById(id, options),
    ...rest,
  });
};

export const useRoleAddPermissionsById = ({
  config,
}: { config?: MutationConfig<typeof RolesServices.addPermissionsById> } = {}) => {
  return useMutation({
    mutationFn: RolesServices.addPermissionsById,
    onSettled: (data) => {
      if (!data?.success) return;

      queryClient.invalidateQueries({ queryKey: [RolesServices.NAME] });
    },
    ...config,
  });
};

export const useRoleRemovePermissionsById = ({
  config,
}: { config?: MutationConfig<typeof RolesServices.removePermissionsById> } = {}) => {
  return useMutation({
    mutationFn: RolesServices.removePermissionsById,
    onSettled: (data) => {
      if (!data?.success) return;

      queryClient.invalidateQueries({ queryKey: [RolesServices.NAME] });
    },
    ...config,
  });
};
