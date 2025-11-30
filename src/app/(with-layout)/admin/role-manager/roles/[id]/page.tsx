'use client';

import PageHeader from '@base/components/PageHeader';
import { Permissions, Roles } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { getAccess } from '@modules/auth/lib/utils/client';
import { IPermission } from '@modules/permissions/lib/interfaces';
import {
  useRoleAddPermissionsById,
  useRoleFindAvailablePermissionsById,
  useRoleFindById,
  useRoleRemovePermissionsById,
} from '@modules/roles/lib/hooks';
import { Checkbox, Empty, message, Spin } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

const RolesIdPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [messageApi, messageHolder] = message.useMessage();
  const [groupedPermissions, setGroupedPermissions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const roleQuery = useRoleFindById({
    id: String(id),
    config: {
      queryKey: [],
      enabled: !!id,
    },
  });

  const roleAvailablePermissionsQuery = useRoleFindAvailablePermissionsById({
    id: String(id),
    options: {
      page: 1,
      limit: 10000,
    },
    config: {
      queryKey: [],
      enabled: !!id,
    },
  });

  const rolePermissionsCreateFn = useRoleAddPermissionsById({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        messageApi.success(res.message);
      },
    },
  });

  const rolePermissionsRemoveFn = useRoleRemovePermissionsById({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        messageApi.success(res.message);
      },
    },
  });

  useEffect(() => {
    if (roleAvailablePermissionsQuery.data?.data) {
      const purifiedGroupedPermissions = Toolbox.groupByProperty(
        roleAvailablePermissionsQuery.data?.data || [],
        'permissionType.title',
      );

      setGroupedPermissions(purifiedGroupedPermissions);
      setLoading(false);
    }
  }, [roleAvailablePermissionsQuery.data?.data]);

  if (roleQuery.isLoading || isLoading) {
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  }

  if (roleQuery.data?.data?.title === Roles.SUPER_ADMIN) {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-white p-5 rounded-lg shadow-md">
          <RiAlarmWarningFill color="#ef4444" size={32} className="animate-pulse" />
          <h3 className="text-2xl font-bold text-red-500">Unauthorized Access</h3>
          <p className="mt-2 text-gray-500">You do not have permission to access this page!</p>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {messageHolder}
      <PageHeader
        title={
          <h2 className="text-xl font-semibold">
            Manage permissions for{' '}
            <span className="text-[var(--color-primary)]">{roleQuery.data?.data?.title}</span>
          </h2>
        }
        onBack={() => router.back()}
      />
      <div className="flex flex-col gap-4">
        {groupedPermissions?.length ? (
          groupedPermissions?.map((permission: { name: string; values: IPermission[] }) => {
            return (
              <div key={JSON.stringify(permission?.values)} className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-medium text-lg">{permission?.name}</h3>
                  <Checkbox
                    className="font-medium"
                    checked={permission?.values?.every((permission) => permission.isAlreadyAdded)}
                    indeterminate={
                      permission?.values?.some((permission) => permission.isAlreadyAdded) &&
                      !permission?.values?.every((permission) => permission.isAlreadyAdded)
                    }
                    onChange={() => {
                      getAccess([Permissions.ROLE_UPDATE], () => {
                        const checkedAll = permission?.values?.every(
                          (permission) => permission?.isAlreadyAdded,
                        );

                        if (checkedAll) {
                          rolePermissionsRemoveFn.mutate({
                            id: String(id),
                            permissions: permission?.values
                              ?.filter((permission) => permission?.isAlreadyAdded)
                              .map((permission) => permission?.id),
                          });
                        } else {
                          rolePermissionsCreateFn.mutate({
                            id: String(id),
                            permissions: permission?.values
                              ?.filter((permission) => !permission?.isAlreadyAdded)
                              .map((permission) => permission?.id),
                          });
                        }
                      });
                    }}
                  >
                    Select All
                  </Checkbox>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-5 gap-4">
                  {permission?.values?.map((value) => (
                    <li key={value?.id}>
                      <Checkbox
                        checked={value?.isAlreadyAdded}
                        onChange={() => {
                          getAccess([Permissions.ROLE_UPDATE], () => {
                            if (value?.isAlreadyAdded) {
                              rolePermissionsRemoveFn.mutate({
                                id: String(id),
                                permissions: [value?.id],
                              });
                            } else {
                              rolePermissionsCreateFn.mutate({
                                id: String(id),
                                permissions: [value?.id],
                              });
                            }
                          });
                        }}
                      >
                        <p className="lowercase">{value.title?.replaceAll('_', ' ')}</p>
                      </Checkbox>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        ) : (
          <Empty description="No permissions available" />
        )}
      </div>
    </React.Fragment>
  );
};

export default WithAuthorization(RolesIdPage, {
  allowedAccess: [Permissions.ROLE_VIEW],
});
