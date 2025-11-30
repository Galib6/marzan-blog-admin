'use client';

import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import { IBaseFilter } from '@base/interfaces';
import { Permissions } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import ArticleForm from '@modules/article/components/ArticleForm';
import ArticleList from '@modules/article/components/ArticleList';
import { useArticles, useCreateArticle } from '@modules/article/lib/hooks';

import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';

import { Button, Drawer, Form, Tag, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const ArticlePage = () => {
  const [messageApi, messageCtx] = message.useMessage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createFormInstance] = Form.useForm();

  const {
    page = 1,
    limit = 10,
    searchTerm,
  } = Toolbox.parseQueryParams<IBaseFilter>(`?${searchParams.toString()}`);

  // query functionalities
  const { isLoading, data } = useArticles({
    options: {
      page: page || 1,
      limit: limit || 10,
      searchTerm: searchTerm,
    },
  });

  // Article create functionalities
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const createArticle = useCreateArticle({
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
        title="Article List"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total items: {data?.meta?.total}</Tag>]}
        extra={[
          <Authorization key="1" allowedAccess={[Permissions.ARTICLE_CREATE]}>
            <Button key="1" type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>,
        ]}
      />
      <ArticleList
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
        title="Create a new Article"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <ArticleForm
          form={createFormInstance}
          initialValues={{ isActive: true, orderPriority: 0 }}
          loading={createArticle.isPending}
          onFinish={async (values) => createArticle.mutateAsync(values)}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default WithAuthorization(ArticlePage, {
  allowedAccess: [Permissions.ARTICLE_VIEW],
});
