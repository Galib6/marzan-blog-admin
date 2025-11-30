import CustomLink from '@base/components/CustomLink';
import { Paths, Permissions } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { getRbacMenuItems } from '@modules/auth/lib/utils/client';
import { Menu } from 'antd';
import { FaUsers, FaUserShield, FaUserTag } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { RiUserStarFill } from 'react-icons/ri';

interface IProps {
  className?: string;
  selectedKeys: string[];
  openKeys: string[];
  onOpenChange: (openKeys: string[]) => void;
}

const UserManagementMenu: React.FC<IProps> = ({ className, selectedKeys, openKeys, onOpenChange }) => {
  return (
    <Menu
      className={className}
      mode="inline"
      theme="light"
      style={{
        fontSize: '14px',
      }}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={getRbacMenuItems([
        {
          key: Paths.admin.users.list,
          icon: <FaUsers />,
          label: <CustomLink href={Toolbox.appendPagination(Paths.admin.users.list)}>Users</CustomLink>,
          allowedAccess: [Permissions.USER_VIEW],
        },
        {
          key: Paths.admin.roleManager.root,
          icon: <FaUserShield />,
          label: 'Role Manager',
          children: [
            {
              allowedAccess: [Permissions.PERMISSION_TYPE_VIEW],
              key: Paths.admin.roleManager.permissionTypes.list,
              icon: <RiUserStarFill />,
              label: (
                <CustomLink href={Toolbox.appendPagination(Paths.admin.roleManager.permissionTypes.list)}>
                  Permission Types
                </CustomLink>
              ),
            },
            {
              key: Paths.admin.roleManager.permissions.list,
              icon: <FaUserTag />,
              label: (
                <CustomLink href={Toolbox.appendPagination(Paths.admin.roleManager.permissions.list)}>
                  Permissions
                </CustomLink>
              ),
              allowedAccess: [Permissions.PERMISSION_VIEW],
            },
            {
              key: Paths.admin.roleManager.roles.list,
              icon: <GrUserAdmin />,
              label: (
                <CustomLink href={Toolbox.appendPagination(Paths.admin.roleManager.roles.list)}>
                  Roles
                </CustomLink>
              ),
              allowedAccess: [Permissions.ROLE_VIEW],
            },
          ],
          allowedAccess: [
            Permissions.PERMISSION_TYPE_VIEW,
            Permissions.PERMISSION_VIEW,
            Permissions.ROLE_VIEW,
          ],
        },
      ])}
    />
  );
};

export default UserManagementMenu;
