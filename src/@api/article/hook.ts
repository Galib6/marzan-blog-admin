import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { IBaseFilter, IdType } from '@modules/base/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArticleService } from './service';

/*----------------------------------------------------------------------------
|                              useArticles                                     |
  -----------------------------------------------------------------------------*/
type IUseArticles = {
  options: IBaseFilter;
  config?: QueryConfig<typeof ArticleService.filter>;
};
export const useArticles = ({ options, config }: IUseArticles) => {
  return useQuery({
    ...config,
    queryKey: [ArticleService.NAME, options],
    queryFn: () => ArticleService.filter(options),
  });
};

/*-----------------------------------------------------------------------------
|                              useArticle hook                                |
------------------------------------------------------------------------------*/

type IUseArticle = {
  id: IdType;
  config?: QueryConfig<typeof ArticleService.filterById>;
};

export const useArticle = ({ id, config }: IUseArticle) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => ArticleService.filterById(id),
  });
};

/*----------------------------------------------------------------------------
|                              useCreateArticle hook                            |
-----------------------------------------------------------------------------*/

type IUseCreateArticle = {
  config?: MutationConfig<typeof ArticleService.create>;
};

export const useCreateArticle = ({ config }: IUseCreateArticle = {}) => {
  return useMutation({
    ...config,
    mutationFn: ArticleService.create,
    onSettled: (res) => {
      if (!res?.acknowledged) return;
      queryClient.invalidateQueries({ queryKey: [ArticleService.NAME] });
    },
  });
};

/*----------------------------------------------------------------------------
|                              useUpdateArticle hook                            |
-----------------------------------------------------------------------------*/
type IUseUpdateArticle = {
  config?: MutationConfig<typeof ArticleService.update>;
};

export const useUpdateArticle = ({ config }: IUseUpdateArticle = {}) => {
  return useMutation({
    ...config,
    mutationFn: ArticleService.update,
    onSettled: (res) => {
      if (!res?.acknowledged) return;
      queryClient.invalidateQueries({ queryKey: [ArticleService.NAME] });
    },
  });
};

/*----------------------------------------------------------------------------
|                              useDeleteArticle hook                            |
-----------------------------------------------------------------------------*/

type IUseDeleteArticle = {
  config?: MutationConfig<typeof ArticleService.delete>;
};

export const useDeleteArticle = ({ config }: IUseDeleteArticle = {}) => {
  return useMutation({
    ...config,
    mutationFn: ArticleService.delete,
    onSettled: (res) => {
      if (!res?.acknowledged) return;
      queryClient.invalidateQueries({ queryKey: [ArticleService.NAME] });
    },
  });
};
