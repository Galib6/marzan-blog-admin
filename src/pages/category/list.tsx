import { PageHeader } from "@ant-design/pro-components";
import { apiMessages } from "@lib/constant";
import { toolbox } from "@lib/utils";
import ArticleCategoryForm from "@modules/articleCategory/components/ArticleCategoryForm";
import ArticleCategoryList from "@modules/articleCategory/components/ArticleCategoryList";

import { Button, Drawer, Form, Tag, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useArticleCategorys,
  useCreateArticleCategory,
} from "src/@api/articleCategory/hook";

const ArticleCategoryPage = () => {
  const router = useRouter();
  const [createForm] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [messageApi, msgCtx] = message.useMessage();

  const { page, limit, searchTerm } = router.query;

  // get ArticleCategorys info
  const { isLoading, data } = useArticleCategorys({
    options: {
      page: Number(page || 1),
      limit: Number(limit || 10),
      searchTerm: searchTerm?.toString() || "",
    },
  });

  //  create functionalities
  const createArticleCategory = useCreateArticleCategory({
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
        title="Article Category list"
        tags={<Tag>Total items: {data?.data.length}</Tag>}
        extra={[
          <Button key="1" type="primary" onClick={() => setDrawerOpen(true)}>
            Create
          </Button>,
        ]}
      />
      <ArticleCategoryList
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
        width={700}
        title="Create a new ArticleCategory"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <ArticleCategoryForm
          form={createForm}
          fromType="create"
          initialValues={{ isActive: true, isFeatured: true } as any}
          loading={createArticleCategory.isLoading}
          onFinish={(values) => createArticleCategory.mutateAsync(values)}
        />
      </Drawer>
    </>
  );
};

export default ArticleCategoryPage;
