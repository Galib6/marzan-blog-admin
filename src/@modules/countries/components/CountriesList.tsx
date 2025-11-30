import Authorization from '@modules/auth/components/Authorization';
import { hasAccessPermission } from '@modules/auth/lib/utils/client';
import { Button, Drawer, Form, PaginationProps, Popconfirm, Space, Switch, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useCountryDelete, useCountryUpdate } from '../lib/hooks';
import { ICountry } from '../lib/interfaces';
import CountriesForm from './CountriesForm';
import { Permissions } from '@lib/constant';

interface IProps {
  data?: ICountry[];
  loading: boolean;
  pagination?: PaginationProps;
}

const CountriesList: React.FC<IProps> = ({ data, loading, pagination }) => {
  const [messageApi, messageCtx] = message.useMessage();
  const [updateFormInstance] = Form.useForm();

  // Country delete functionalities
  const deleteCountry = useCountryDelete({
    config: {
      onSuccess(res) {
        if (!res?.success) return;
        messageApi.success(res?.message);
      },
    },
  });

  // Country update functionalities
  const [updateItem, setUpdateItem] = useState<ICountry>(null);

  const updateCountry = useCountryUpdate({
    config: {
      onSuccess: (res) => {
        if (!res?.success) return;
        message.success(res?.message);
        setUpdateItem(null);
        updateFormInstance.resetFields();
      },
    },
  });

  // Country table data source config
  const dataSource = data?.map((x) => ({
    key: x?.id,
    id: x?.id,

    title: x?.title,
    visaType: x?.visaType,
    isActive: x?.isActive,
    createdAt: x?.createdAt,

    updatedAt: x?.updatedAt,
  }));

  const columns: ColumnsType<(typeof dataSource)[number]> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Visa Type',
      dataIndex: 'visaType',
      key: 'visaType',
    },
    ...(hasAccessPermission([Permissions.COUNTRY_UPDATE])
      ? [
          {
            title: 'Active',
            dataIndex: 'isActive',
            key: 'isActive',
            render(isActive, record) {
              return (
                <Switch
                  checked={isActive}
                  onChange={(checked) => {
                    updateCountry.mutateAsync({
                      id: record.id,
                      data: {
                        isActive: checked,
                      },
                    });
                  }}
                />
              );
            },
          },
        ]
      : []),
    ...(hasAccessPermission([Permissions.COUNTRY_UPDATE, Permissions.COUNTRY_DELETE])
      ? [
          {
            key: 'id',
            dataIndex: 'id',
            title: 'Action',
            render: (id) => {
              return (
                <Space>
                  <Authorization key="1" allowedAccess={[Permissions.COUNTRY_UPDATE]}>
                    <Button
                      style={{ fontSize: 20, borderRadius: 5 }}
                      onClick={() => {
                        const chosenItem = data.find((item) => item.id === id);
                        setUpdateItem(chosenItem);
                      }}
                    >
                      <AiFillEdit />
                    </Button>
                  </Authorization>
                  <Authorization key="2" allowedAccess={[Permissions.COUNTRY_DELETE]}>
                    <Popconfirm
                      title="Are you sure to delete it?"
                      onConfirm={() => deleteCountry.mutate(id)}
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{ danger: true }}
                    >
                      <Button danger type="primary" style={{ fontSize: 20, borderRadius: 5 }}>
                        <AiFillDelete />
                      </Button>
                    </Popconfirm>
                  </Authorization>
                </Space>
              );
            },
          },
        ]
      : []),
  ];
  // Country table data source config end

  return (
    <React.Fragment>
      {messageCtx}
      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={pagination} />
      <Drawer title="Update Country" open={!!updateItem?.id} onClose={() => setUpdateItem(null)}>
        <CountriesForm
          form={updateFormInstance}
          formType="update"
          initialValues={{ ...updateItem }}
          loading={updateCountry.isPending}
          onFinish={(values) =>
            updateCountry.mutateAsync({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default CountriesList;
