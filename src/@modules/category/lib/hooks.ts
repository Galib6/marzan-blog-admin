import { MutationConfig, queryClient, QueryConfig } from '@lib/config';

import { IBaseFilter } from '@base/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notification } from 'antd';
import { CategoryService } from './service';

//---------------- useCategorys hook ------------------------------------
type IUseCategories = {
  options: IBaseFilter;
  config?: QueryConfig<typeof CategoryService.filter>;
};
export const useCategories = ({ options, config }: IUseCategories) => {
  return useQuery({
    ...config,
    queryKey: [CategoryService.NAME, options],
    queryFn: () => CategoryService.filter(options),
  });
};

//----------------------- useCategory hook --------------------------------------
type IUseCategory = {
  id: string;
  config?: QueryConfig<typeof CategoryService.filterById>;
};

export const useCategory = ({ id, config }: IUseCategory) => {
  return useQuery({
    ...config,
    queryFn: () => CategoryService.filterById(id),
  });
};

//------------------ useCreateCategory hook ---------------------------------
type IUseCreateCategory = {
  config?: MutationConfig<typeof CategoryService.create>;
};

export const useCreateCategory = ({ config }: IUseCreateCategory = {}) => {
  return useMutation({
    ...config,
    mutationFn: CategoryService.create,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [CategoryService.NAME] });
      notification.success({
        message: res?.message,
      });
    },
  });
};

//------------------ useUpdateCategory hook ----------------------------------
type IUseUpdateCategory = {
  config?: MutationConfig<typeof CategoryService.update>;
};

export const useUpdateCategory = ({ config }: IUseUpdateCategory = {}) => {
  return useMutation({
    ...config,
    mutationFn: CategoryService.update,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [CategoryService.NAME] });
      notification.success({
        message: res?.message,
      });
    },
  });
};

//------------------ useDeleteCategory hook ----------------------------------
type IUseDeleteCategory = {
  config?: MutationConfig<typeof CategoryService.delete>;
};

export const useDeleteCategory = ({ config }: IUseDeleteCategory = {}) => {
  return useMutation({
    ...config,
    mutationFn: CategoryService.delete,
    onSuccess: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [CategoryService.NAME] });
      notification.success({
        message: 'Successfully deleted',
      });
    },
  });
};
