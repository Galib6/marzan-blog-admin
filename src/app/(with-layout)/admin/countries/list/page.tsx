'use client';

import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import { IBaseFilter } from '@base/interfaces';
import { Permissions } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import CountriesForm from '@modules/countries/components/CountriesForm';
import CountriesList from '@modules/countries/components/CountriesList';
import { useCountries, useCountryCreate } from '@modules/countries/lib/hooks';
import { Button, Drawer, Form, Tag, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const CountriesPage = () => {
  const [messageApi, messageCtx] = message.useMessage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createFormInstance] = Form.useForm();

  const { page, limit, searchTerm } = Toolbox.parseQueryParams<IBaseFilter>(`?${searchParams.toString()}`);

  // query functionalities
  const { isLoading, data } = useCountries({
    options: {
      page: page,
      limit: limit,
      searchTerm: searchTerm,
    },
  });

  // Country create functionalities
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const createCountry = useCountryCreate({
    config: {
      onSuccess: (res) => {
        if (!res?.success) return;
        createFormInstance.resetFields();
        setDrawerOpen(false);
        messageApi.success(res?.message);
      },
    },
  });

  return (
    <React.Fragment>
      {messageCtx}

      <PageHeader
        title="Country List"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total items: {data?.meta?.total}</Tag>]}
        extra={[
          <Authorization key="1" allowedAccess={[Permissions.COUNTRY_CREATE]}>
            <Button key="1" type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>,
        ]}
      />
      <CountriesList
        loading={isLoading}
        data={data?.data}
        pagination={{
          total: data?.meta?.total,
          current: Number(page),
          pageSize: Number(limit),
          onChange: (page, limit) => {
            const params = Toolbox.toCleanObject({
              ...Object.fromEntries(searchParams.entries()),
              page,
              limit,
            });
            const queryString = new URLSearchParams(params).toString();
            router.push(`?${queryString}`);
          },
        }}
      />
      <Drawer title="Create a new Country" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <CountriesForm
          form={createFormInstance}
          initialValues={{ isActive: true, orderPriority: 0 }}
          loading={createCountry.isPending}
          onFinish={async (values) => createCountry.mutateAsync(values)}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default WithAuthorization(CountriesPage, {
  allowedAccess: [Permissions.COUNTRY_VIEW],
});
