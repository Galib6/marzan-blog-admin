'use client';

import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import { IBaseFilter } from '@base/interfaces';
import { Permissions } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import RolesForm from '@modules/roles/components/RolesForm';
import RolesList from '@modules/roles/components/RolesList';
import { useRoleCreate, useRoleFind } from '@modules/roles/lib/hooks';
import { Button, Drawer, Form, message, Tag } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const RolesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const {
    page = 1,
    limit = 10,
    ...rest
  } = Toolbox.parseQueryParams<IBaseFilter>(`?${searchParams.toString()}`);

  const rolesQuery = useRoleFind({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  const roleCreateFn = useRoleCreate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setDrawerOpen(false);
        formInstance.resetFields();
        messageApi.success(res.message);
      },
    },
  });

  return (
    <React.Fragment>
      {messageHolder}
      <PageHeader
        title="Roles"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {rolesQuery.data?.meta?.total || 0}</Tag>]}
        extra={
          <Authorization allowedAccess={[Permissions.ROLE_CREATE]}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>
        }
      />
      <RolesList
        isLoading={rolesQuery.isLoading}
        data={rolesQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: rolesQuery.data?.meta?.total,
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
      <Drawer width={450} title="Create a new role" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <RolesForm
          form={formInstance}
          initialValues={{ isActive: true }}
          isLoading={roleCreateFn.isPending}
          onFinish={(values) => roleCreateFn.mutate(values)}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default WithAuthorization(RolesPage, {
  allowedAccess: [Permissions.ROLE_VIEW],
});
