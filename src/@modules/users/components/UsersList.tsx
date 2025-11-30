import CustomSwitch from '@base/components/CustomSwitch';
import { ENUM_SUPER_ADMIN_ROLE } from '@lib/enums/common.enum';
import { hasAccessPermission } from '@modules/auth/lib/utils/client';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Drawer, Form, message, Table } from 'antd';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { useUserUpdate } from '../lib/hooks';
import { IUser } from '../lib/interfaces';
import UsersForm from './UsersForm';
import { Permissions } from '@lib/constant';

interface IProps {
  isLoading: boolean;
  isRoles?: boolean;
  data: IUser[];
  pagination: PaginationProps;
}

const UsersList: React.FC<IProps> = ({ isLoading, isRoles = true, data, pagination }) => {
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [updateItem, setUpdateItem] = useState<IUser>(null);

  const userUpdateFn = useUserUpdate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setUpdateItem(null);
        messageApi.success(res.message);
      },
    },
  });

  const dataSource = data?.map((elem) => ({
    key: elem?.id,
    id: elem?.id,
    name: elem?.firstName + ' ' + elem?.lastName,
    email: elem?.email,
    isActive: elem?.isActive,
    createdAt: elem?.createdAt,
    createdBy: elem?.createdBy?.firstName + ' ' + elem?.createdBy?.lastName,
    updatedAt: elem?.updatedAt,
    updatedBy: elem?.updatedBy?.firstName + ' ' + elem?.updatedBy?.lastName,
  }));

  const columns: TableColumnsType<(typeof dataSource)[number]> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
    },
    ...(hasAccessPermission([Permissions.USER_UPDATE])
      ? [
          {
            key: 'isActive',
            dataIndex: 'isActive',
            title: 'Active',
            render: (isActive, record) => {
              return (
                <CustomSwitch
                  checked={isActive}
                  onChange={(checked) => {
                    userUpdateFn.mutate({
                      id: record?.id,
                      data: {
                        isActive: checked,
                      },
                    });
                  }}
                />
              );
            },
          },
          {
            key: 'id',
            dataIndex: 'id',
            title: 'Action',
            // align: 'center',
            render: (id) => (
              <Button
                onClick={() => {
                  const item = data?.find((item) => item.id === id);
                  setUpdateItem(item);
                }}
              >
                <AiFillEdit />
              </Button>
            ),
          },
        ]
      : []),
  ];

  return (
    <React.Fragment>
      {messageHolder}
      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        scroll={{ x: true }}
      />
      <Drawer
        width={640}
        title={`Update ${updateItem?.firstName}`}
        open={!!updateItem?.id}
        onClose={() => setUpdateItem(null)}
      >
        <UsersForm
          isRoles={isRoles}
          formType="update"
          form={formInstance}
          initialValues={{
            ...updateItem,
            roles: updateItem?.roles
              .filter((item) => item?.title !== ENUM_SUPER_ADMIN_ROLE.SUPER_ADMIN)
              ?.map((userRole) => ({ role: userRole?.id })),
            isActive: updateItem?.isActive,
          }}
          isLoading={userUpdateFn.isPending}
          onFinish={(values) =>
            userUpdateFn.mutate({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default UsersList;
