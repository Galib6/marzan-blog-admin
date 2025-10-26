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

import { useDeleteArticle, useUpdateArticle } from "src/@api/article/hook";
import { IArticle } from "src/@api/article/interfaces";
import { ArticleService } from "src/@api/article/service";
import CategoryForm from "./ArticleForm";

interface IProps {
  data?: IArticle[];
  loading: boolean;
  pagination?: PaginationProps;
}

const ArticleList: React.FC<IProps> = ({ data, loading, pagination }) => {
  const [messageApi, messageCtx] = message.useMessage();
  const [updateItem, setUpdateItem] = useState<IArticle>();
  const [updateForm] = Form.useForm();

  // delete Article
  const deleteArticle = useDeleteArticle({
    config: {
      onSuccess: (res) => {
        if (!res?.acknowledged) return;
        messageApi.success(apiMessages.delete);
      },
    },
  });
  const updateArticle = useUpdateArticle({
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
                updateArticle?.variables?.id === record?.id &&
                updateArticle?.isLoading
              }
              checked={isActive?.toLowerCase() === "true"}
              onChange={(checked) => {
                updateArticle.mutateAsync({
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
      render: (id: string, record: IArticle) => (
        <Space>
          <Button
            style={{ fontSize: 20, borderRadius: 5 }}
            onClick={async () => {
              const data = await ArticleService.filterById(id);
              setUpdateItem(data?.data);
            }}
          >
            <AiFillEdit />
          </Button>

          <Popconfirm
            title="Are you sure you want to delete it?"
            onConfirm={() =>
              getAccess(["FORBIDDEN"], () => deleteArticle.mutate(id))
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
        width={1000}
        title="Update this -Article"
        open={updateItem?._id ? true : false}
        onClose={() => setUpdateItem(null)}
      >
        <CategoryForm
          form={updateForm}
          fromType="update"
          initialValues={updateItem as IArticle}
          loading={updateArticle.isLoading}
          onFinish={(values) =>
            updateArticle.mutateAsync({ id: updateItem?._id, data: values })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default ArticleList;
