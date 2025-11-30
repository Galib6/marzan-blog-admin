'use client';

import { Button, Drawer, Form, PaginationProps, Popconfirm, Space, Switch, Table } from 'antd';
import React, { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useDeleteCategory, useUpdateCategory } from '../lib/hooks';

import { ColumnsType } from 'antd/es/table';
import CategoryForm from './CategoryForm';

import EditableInput from '@base/components/EditableInput';
import EditableInputNumber from '@base/components/EditableInputNumber';
import FilePreviewer from '@base/components/FilePreviewer';
import { getAccess } from '@modules/auth/lib/utils/client';
import { ICategory } from '../lib/interfaces';
import { CategoryService } from '../lib/service';
import { Permissions } from '@lib/constant';

interface IProps {
  data?: ICategory[];
  loading: boolean;
  pagination?: PaginationProps;
}
const CategoryList: React.FC<IProps> = ({ data, loading, pagination }) => {
  const [form] = Form.useForm();

  // Category delete functionalities
  const deleteCategory = useDeleteCategory();

  // Category update functionalities
  const [updateItem, setUpdateItem] = useState<ICategory>(null);
  const updateCategory = useUpdateCategory({
    config: {
      onSuccess: (res) => {
        if (!res?.success) return;
        setUpdateItem(null);
        form.resetFields();
      },
    },
  });

  // Category table data source config
  const dataSource = data?.map((x) => ({
    key: x.id,
    id: x.id,
    image: x.image,
    title: x.title,
    orderPriority: x.orderPriority,
    description: x.description,
    isActive: x.isActive.toString(),
  }));

  const columns: ColumnsType = [
    {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <FilePreviewer src={image} width={121} height={81} alt="image" />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record: ICategory) => {
        return (
          <EditableInput
            value={title}
            placeholder="Write some thing"
            onBlur={(e) => {
              if (e.target.value === title) return;
              updateCategory.mutateAsync({
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
      title: 'orderPriority',
      dataIndex: 'orderPriority',
      key: 'orderPriority',
      render: (orderPriority, record: ICategory) => {
        return (
          <EditableInputNumber
            value={orderPriority}
            placeholder="Order Priority"
            onBlur={(value) => {
              if (value === orderPriority) return;
              updateCategory.mutateAsync({
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
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Is Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render(isActive, record: ICategory) {
        return (
          <div className="flex gap-2">
            <span>{isActive}</span>
            <Switch
              checked={isActive.toLowerCase() === 'true'}
              onChange={(checked) => {
                updateCategory.mutateAsync({
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
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id: string) => (
        <Space>
          <Button
            style={{ fontSize: 20, borderRadius: 5 }}
            onClick={async () => {
              const data = await CategoryService.filterById(id);
              setUpdateItem(data?.data);
            }}
          >
            <AiFillEdit />
          </Button>
          <Popconfirm
            title="Are you sure to delete it?"
            onConfirm={() => getAccess([Permissions.FORBIDDEN], () => deleteCategory.mutate(id))}
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
  // Category table data source config end

  return (
    <React.Fragment>
      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={pagination} />
      <Drawer
        title="Update this Category"
        open={updateItem?.id ? true : false}
        onClose={() => setUpdateItem({} as ICategory)}
      >
        <CategoryForm
          form={form}
          initialValues={updateItem}
          loading={updateCategory.isPending}
          onFinish={(values) => updateCategory.mutateAsync({ id: updateItem?.id, data: values })}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default CategoryList;
