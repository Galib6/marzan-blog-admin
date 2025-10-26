import { MutationConfig, queryClient, QueryConfig } from "@lib/config";
import { IBaseFilter, IdType } from "@modules/base/interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArticleCategoryService } from "./service";

/*----------------------------------------------------------------------------
|                              useArticleCategorys                                     |
  -----------------------------------------------------------------------------*/
type IUseArticleCategorys = {
  options: IBaseFilter;
  config?: QueryConfig<typeof ArticleCategoryService.filter>;
};
export const useArticleCategorys = ({
  options,
  config,
}: IUseArticleCategorys) => {
  return useQuery({
    ...config,
    queryKey: [ArticleCategoryService.NAME, options],
    queryFn: () => ArticleCategoryService.filter(options),
  });
};

/*-----------------------------------------------------------------------------
|                              useArticleCategory hook                                |
------------------------------------------------------------------------------*/

type IUseArticleCategory = {
  id: IdType;
  config?: QueryConfig<typeof ArticleCategoryService.filterById>;
};

export const useArticleCategory = ({ id, config }: IUseArticleCategory) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => ArticleCategoryService.filterById(id),
  });
};

/*----------------------------------------------------------------------------
|                              useCreateArticleCategory hook                            |
-----------------------------------------------------------------------------*/

type IUseCreateArticleCategory = {
  config?: MutationConfig<typeof ArticleCategoryService.create>;
};

export const useCreateArticleCategory = ({
  config,
}: IUseCreateArticleCategory = {}) => {
  return useMutation({
    ...config,
    mutationFn: ArticleCategoryService.create,
    onSettled: (res) => {
      if (!res?.acknowledged) return;
      queryClient.invalidateQueries({
        queryKey: [ArticleCategoryService.NAME],
      });
    },
  });
};

/*----------------------------------------------------------------------------
|                              useUpdateArticleCategory hook                            |
-----------------------------------------------------------------------------*/
type IUseUpdateArticleCategory = {
  config?: MutationConfig<typeof ArticleCategoryService.update>;
};

export const useUpdateArticleCategory = ({
  config,
}: IUseUpdateArticleCategory = {}) => {
  return useMutation({
    ...config,
    mutationFn: ArticleCategoryService.update,
    onSettled: (res) => {
      if (!res?.acknowledged) return;
      queryClient.invalidateQueries({
        queryKey: [ArticleCategoryService.NAME],
      });
    },
  });
};

/*----------------------------------------------------------------------------
|                              useDeleteArticleCategory hook                            |
-----------------------------------------------------------------------------*/

type IUseDeleteArticleCategory = {
  config?: MutationConfig<typeof ArticleCategoryService.delete>;
};

export const useDeleteArticleCategory = ({
  config,
}: IUseDeleteArticleCategory = {}) => {
  return useMutation({
    ...config,
    mutationFn: ArticleCategoryService.delete,
    onSettled: (res) => {
      if (!res?.acknowledged) return;
      queryClient.invalidateQueries({
        queryKey: [ArticleCategoryService.NAME],
      });
    },
  });
};
