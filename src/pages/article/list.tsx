import { PageHeader } from "@ant-design/pro-components";
import { apiMessages } from "@lib/constant";
import { toolbox } from "@lib/utils";
import ArticleForm from "@modules/articles/components/ArticleForm";
import ArticleList from "@modules/articles/components/ArticleList";

import { Button, Drawer, Form, Tag, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useArticles, useCreateArticle } from "src/@api/article/hook";

const ArticlePage = () => {
  const router = useRouter();
  const [createForm] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [messageApi, msgCtx] = message.useMessage();

  const { page, limit, searchTerm } = router.query;

  // get Articles info
  const { isLoading, data } = useArticles({
    options: {
      page: Number(page || 1),
      limit: Number(limit || 10),
      searchTerm: searchTerm?.toString() || "",
    },
  });

  //  create functionalities
  const createArticle = useCreateArticle({
    config: {
      onSuccess: (res) => {
        if (!res?.acknowledged) return;
        createForm.resetFields();
        messageApi.success(apiMessages.create);
        setDrawerOpen(false);
      },
    },
  });

  return (
    <>
      {msgCtx}
      <PageHeader
        title="Article list"
        tags={<Tag>Total items: {data?.data.length}</Tag>}
        extra={[
          <Button key="1" type="primary" onClick={() => setDrawerOpen(true)}>
            Create
          </Button>,
        ]}
      />
      <ArticleList
        data={data?.data}
        loading={isLoading}
        pagination={{
          total: data?.meta?.total,
          current: Number(page || 1),
          pageSize: Number(limit || 10),
          onChange: (page, limit) =>
            router.push({
              query: toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />

      <Drawer
        width={1000}
        title="Create a new Article"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <ArticleForm
          form={createForm}
          fromType="create"
          initialValues={{ isActive: true, isFeatured: true } as any}
          loading={createArticle.isLoading}
          onFinish={(values) => createArticle.mutateAsync(values)}
        />
      </Drawer>
    </>
  );
};

export default ArticlePage;
