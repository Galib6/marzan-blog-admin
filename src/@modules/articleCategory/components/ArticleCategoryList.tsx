import { apiMessages } from "@lib/constant";
import { getAccess } from "@modules/auth/components/utils";
import {
  Button,
  Drawer,
  Form,
  Popconfirm,
  Space,
  Switch,
  Table,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table/interface";
import { PaginationProps } from "antd/lib/pagination";
import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import {
  useDeleteArticleCategory,
  useUpdateArticleCategory,
} from "src/@api/articleCategory/hook";
import { IArticleCategory } from "src/@api/articleCategory/interface";
import { ArticleCategoryService } from "src/@api/articleCategory/service";
import CategoryForm from "./ArticleCategoryForm";

interface IProps {
  data?: IArticleCategory[];
  loading: boolean;
  pagination?: PaginationProps;
}

const ArticleCategoryList: React.FC<IProps> = ({
  data,
  loading,
  pagination,
}) => {
  const [messageApi, messageCtx] = message.useMessage();
  const [updateItem, setUpdateItem] = useState<IArticleCategory>();
  const [updateForm] = Form.useForm();

  // delete ArticleCategory
  const deleteArticleCategory = useDeleteArticleCategory({
    config: {
      onSuccess: (res) => {
        if (!res?.acknowledged) return;
        messageApi.success(apiMessages.delete);
      },
    },
  });
  const updateArticleCategory = useUpdateArticleCategory({
    config: {
      onSuccess: (res) => {
        if (!res?.acknowledged) return;
        setUpdateItem(null);
        messageApi.success(apiMessages.update);
      },
    },
  });

  const dataSource = data?.map((x) => ({
    ...x,
    key: x?._id,
    id: x?._id,
    slug: x?.slug,
    orderPriority: x?.orderPriority,
    isActive: x?.isActive?.toString(),
  }));

  const columns: ColumnsType = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "orderPriority",
      dataIndex: "orderPriority",
      key: "orderPriority",
    },
    {
      title: "slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "isActive",
      dataIndex: "isActive",
      key: "isActive",
      render(isActive, record: any) {
        return (
          <div className="flex gap-2">
            <span>{isActive}</span>
            <Switch
              loading={
                updateArticleCategory?.variables?.id === record?.id &&
                updateArticleCategory?.isLoading
              }
              checked={isActive?.toLowerCase() === "true"}
              onChange={(checked) => {
                updateArticleCategory.mutateAsync({
                  id: record._id,
                  data: {
                    isActive: checked,
                  },
                });
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id: string, record: IArticleCategory) => (
        <Space>
          <Button
            style={{ fontSize: 20, borderRadius: 5 }}
            onClick={async () => {
              const data = await ArticleCategoryService.filterById(id);
              setUpdateItem(data?.data);
            }}
          >
            <AiFillEdit />
          </Button>

          <Popconfirm
            title="Are you sure you want to delete it?"
            onConfirm={() =>
              getAccess(["FORBIDDEN"], () => deleteArticleCategory.mutate(id))
            }
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              danger
              type="primary"
              style={{ fontSize: 20, borderRadius: 5 }}
            >
              <AiFillDelete />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {messageCtx}

      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
      />
      <Drawer
        width={700}
        title="Update this -ArticleCategory"
        open={updateItem?._id ? true : false}
        onClose={() => setUpdateItem(null)}
      >
        <CategoryForm
          form={updateForm}
          fromType="update"
          initialValues={updateItem as IArticleCategory}
          loading={updateArticleCategory.isLoading}
          onFinish={(values) =>
            updateArticleCategory.mutateAsync({
              id: updateItem?._id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default ArticleCategoryList;
