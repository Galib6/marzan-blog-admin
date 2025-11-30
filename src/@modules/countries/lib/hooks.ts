import { IBaseFilter } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CountryService } from './service';

//---------------- useCountries hook ------------------------------------
type IUseCountries = {
  options: IBaseFilter;
  config?: QueryConfig<typeof CountryService.find>;
};
export const useCountries = ({ options, config }: IUseCountries) => {
  return useQuery({
    ...config,
    queryKey: [CountryService.NAME, options],
    queryFn: () => CountryService.find(options),
  });
};

//----------------------- useCountry hook --------------------------------------
type IUseCountry = {
  id: string;
  config?: QueryConfig<typeof CountryService.findById>;
};

export const useCountry = ({ id, config }: IUseCountry) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => CountryService.findById(id),
  });
};

//------------------ useCountryCreate hook ---------------------------------
type IUseCountryCreate = {
  config?: MutationConfig<typeof CountryService.create>;
};

export const useCountryCreate = ({ config }: IUseCountryCreate = {}) => {
  return useMutation({
    ...config,
    mutationFn: CountryService.create,
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({
        queryKey: [CountryService.NAME],
      });
    },
  });
};

//------------------ useCountryUpdate hook ----------------------------------
type IUseCountryUpdate = {
  config?: MutationConfig<typeof CountryService.update>;
};

export const useCountryUpdate = ({ config }: IUseCountryUpdate = {}) => {
  return useMutation({
    ...config,
    mutationFn: CountryService.update,
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({
        queryKey: [CountryService.NAME],
      });
    },
  });
};

//------------------ useCountryDelete hook ----------------------------------
type IUseCountryDelete = {
  config?: MutationConfig<typeof CountryService.delete>;
};

export const useCountryDelete = ({ config }: IUseCountryDelete = {}) => {
  return useMutation({
    ...config,
    mutationFn: CountryService.delete,
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({
        queryKey: [CountryService.NAME],
      });
    },
  });
};
