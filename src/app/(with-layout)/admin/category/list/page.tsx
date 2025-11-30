'use client';

import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import { IBaseFilter } from '@base/interfaces';
import { Permissions } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import CategoryForm from '@modules/category/components/CategoryForm';
import CategoryList from '@modules/category/components/CategoryList';
import { useCategories, useCreateCategory } from '@modules/category/lib/hooks';

import { Button, Drawer, Form, Tag, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const CategoryPage = () => {
  const [messageApi, messageCtx] = message.useMessage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createFormInstance] = Form.useForm();

  const { page, limit, searchTerm } = Toolbox.parseQueryParams<IBaseFilter>(`?${searchParams.toString()}`);

  // query functionalities
  const { isLoading, data } = useCategories({
    options: {
      page: page || 1,
      limit: limit || 10,
      searchTerm: searchTerm,
    },
  });

  // Category create functionalities
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const createCategory = useCreateCategory({
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
        title="Visa Category List"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total items: {data?.meta?.total}</Tag>]}
        extra={[
          <Authorization key="1" allowedAccess={[Permissions.VISA_CATEGORY_CREATE]}>
            <Button key="1" type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>,
        ]}
      />
      <CategoryList
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
      <Drawer
        width={600}
        title="Create a new Visa Category"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <CategoryForm
          form={createFormInstance}
          initialValues={{ isActive: true, orderPriority: 0 }}
          loading={createCategory.isPending}
          onFinish={async (values) => createCategory.mutateAsync(values)}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default WithAuthorization(CategoryPage, {
  allowedAccess: [Permissions.VISA_CATEGORY_VIEW],
});
