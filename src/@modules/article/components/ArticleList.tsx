'use client';

import { Button, Drawer, Form, Image, PaginationProps, Popconfirm, Space, Switch, Table } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineFileText } from 'react-icons/ai';
import { useDeleteArticle, useUpdateArticle } from '../lib/hooks';

import { ColumnsType } from 'antd/es/table';
import ArticleForm from './ArticleForm';

import EditableInput from '@base/components/EditableInput';
import EditableInputNumber from '@base/components/EditableInputNumber';
import { Permissions } from '@lib/constant';
import { getAccess } from '@modules/auth/lib/utils/client';
import { IArticle } from '../lib/interfaces';
import { ArticleService } from '../lib/service';

interface IProps {
  data?: IArticle[];
  loading: boolean;
  pagination?: PaginationProps;
}
const ArticleList: React.FC<IProps> = ({ data, loading, pagination }) => {
  const [form] = Form.useForm();

  // Article delete functionalities
  const deleteArticle = useDeleteArticle();

  // Article update functionalities
  const [updateItem, setUpdateItem] = useState<IArticle>(null);
  const updateArticle = useUpdateArticle({
    config: {
      onSuccess: (res) => {
        if (!res?.success) return;
        setUpdateItem(null);
        form.resetFields();
      },
    },
  });

  // Article table data source config
  const dataSource = data?.map((x) => ({
    key: x.id,
    id: x.id,
    thumb: x.thumb,
    title: x.title,
    name: x.name,
    orderPriority: x.orderPriority,
    summary: x.summary,
    isActive: x.isActive.toString(),
  }));

  const columns: ColumnsType = [
    {
      title: 'Thumb',
      dataIndex: 'thumb',
      key: 'thumb',
      render: (thumb) => <Image src={thumb} width={50} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record: IArticle) => {
        return (
          <EditableInput
            value={title}
            placeholder="Write some thing"
            onBlur={(e) => {
              if (e.target.value === title) return;
              updateArticle.mutateAsync({
                id: record.id,
                data: {
                  title: e.target.value,
                },
              });
            }}
          />
        );
      },
    },

    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary',
    },
    {
      title: 'Is Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render(isActive, record: IArticle) {
        return (
          <div className="flex gap-2">
            <span>{isActive}</span>
            <Switch
              checked={isActive.toLowerCase() === 'true'}
              onChange={(checked) => {
                updateArticle.mutateAsync({
                  id: record?.id,
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
      title: 'orderPriority',
      dataIndex: 'orderPriority',
      key: 'orderPriority',
      render: (orderPriority, record: IArticle) => {
        return (
          <EditableInputNumber
            value={orderPriority}
            placeholder="Order Priority"
            onBlur={(value) => {
              if (value === orderPriority) return;
              updateArticle.mutateAsync({
                id: record.id,
                data: {
                  orderPriority: +value,
                },
              });
            }}
          />
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id: string) => (
        <Space>
          <Link href={`/admin/article/${id}/content`}>
            <Button style={{ fontSize: 20, borderRadius: 5 }}>
              <AiOutlineFileText />
            </Button>
          </Link>
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
            title="Are you sure to delete it?"
            onConfirm={() => getAccess([Permissions.FORBIDDEN], () => deleteArticle.mutate(id))}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button danger type="primary" style={{ fontSize: 20, borderRadius: 5 }}>
              <AiFillDelete />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // Article table data source config end

  return (
    <React.Fragment>
      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={pagination} />
      <Drawer
        size={900}
        title="Update this Article"
        open={updateItem?.id ? true : false}
        onClose={() => setUpdateItem({} as IArticle)}
      >
        <ArticleForm
          form={form}
          initialValues={updateItem}
          loading={updateArticle.isPending}
          onFinish={(values) => updateArticle.mutateAsync({ id: updateItem?.id, data: values })}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default ArticleList;
