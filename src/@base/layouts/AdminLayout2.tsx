import BrandLogo from '@base/components/BrandLogo';
import CustomLink from '@base/components/CustomLink';
import { Paths, Permissions } from '@lib/constant';
import { states } from '@lib/constant/storage';
import useLocalStorage from '@lib/hooks/useLocalStorage';
import useSessionState from '@lib/hooks/useSessionState';
import { cn } from '@lib/utils';
import { getContentAccess } from '@modules/auth/lib/utils/client';
import { Grid, Layout, Tabs } from 'antd';
import { usePathname } from 'next/navigation';
import React, { useRef } from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsMenuButton } from 'react-icons/bs';
import MainMenu from './elements/MainMenu';
import UserManagementMenu from './elements/UserManagementMenu';
import WelcomeMenu from './elements/WelcomeMenu';

interface IFProps extends React.PropsWithChildren {}
const AdminLayout: React.FC<IFProps> = ({ children }) => {
  const pathname = usePathname();
  const screens = Grid.useBreakpoint();
  const [sidebar, setSidebar] = useSessionState(states?.sidebar);
  const ref = useRef(null);
  const [menu, setActiveMenu] = useLocalStorage(states?.menu);

  const styles = {
    sider: {
      boxShadow: '0 0 20px #0815420d',
      borderRight: '1px solid #ecf3fa',
      overflow: 'hidden',
      height: '100vh',
      position: 'fixed',
      left: !screens.md && !sidebar.opened ? '-100%' : 0,
      zIndex: 100,
    },

    header: {
      position: 'fixed',
      width: '100%',
      background: '#fff',
      padding: '0 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 99,
      paddingLeft: !screens.md ? (sidebar.opened ? 270 : 20) : sidebar.opened ? 300 : 100,
      right: 0,
      boxShadow: '0 0 20px #0815420d',
      borderBottom: '1px solid #ecf3fa',
    },
    layout: {
      background: '#f6f8fa',
      marginLeft: !screens.md ? 0 : sidebar.opened ? 280 : 80,
      padding: 14,
      paddingTop: 0,
    },

    content: {
      borderRadius: 5,
      padding: 14,
      minHeight: 280,
      // background: '#fff',
      marginTop: 77,
      marginLeft: 0,
      marginRight: 14,
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider
        ref={ref}
        className="sidebar"
        style={styles.sider as any}
        width={280}
        breakpoint="md"
        onBreakpoint={(broken) => {
          if (broken === true) {
            setSidebar({ ...sidebar, opened: false });
          }
        }}
        trigger={null}
        collapsible
        collapsed={!sidebar.opened}
        theme="light"
      >
        <div
          style={{
            margin: 15,
            marginBottom: 15,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CustomLink href={Paths.root}>
            <BrandLogo width={180} />
          </CustomLink>
        </div>

        <Tabs
          type="card"
          activeKey={menu?.activeTabsKeys}
          onChange={(v) => setActiveMenu({ ...menu, activeTabsKeys: v })}
          items={[
            // {
            //   label: <BsMenuButton />,
            //   key: 'menu',
            //   children: (
            //     <MainMenu
            //       className="mt-4"
            //       selectedKeys={[pathname]}
            //       openKeys={menu?.openMenuKeys}
            //       onOpenChange={(keys) => setActiveMenu({ openMenuKeys: keys })}
            //     />
            //   ),
            // },
            getContentAccess({
              content: {
                label: <BsMenuButton />,
                key: 'menu',

                children: (
                  <MainMenu
                    className="mt-4"
                    selectedKeys={[pathname]}
                    openKeys={menu?.openMenuKeys}
                    onOpenChange={(keys) => setActiveMenu({ openMenuKeys: keys })}
                  />
                ),
              },
              allowedAccess: [
                Permissions.COUNTRY_VIEW,
                Permissions.COUNTRY_CREATE,
                Permissions.COUNTRY_UPDATE,
                Permissions.COUNTRY_DELETE,
                Permissions.DEPOSITORY_COLUMN_VIEW,
                Permissions.DEPOSITORY_COLUMN_CREATE,
                Permissions.DEPOSITORY_COLUMN_UPDATE,
                Permissions.DEPOSITORY_COLUMN_DELETE,
                Permissions.DEPOSITORY_COLUMN_OPTION_VIEW,
                Permissions.DEPOSITORY_COLUMN_OPTION_CREATE,
                Permissions.DEPOSITORY_COLUMN_OPTION_UPDATE,
                Permissions.DEPOSITORY_COLUMN_OPTION_DELETE,
                Permissions.DEPOSITORY_COLUMN_VALUE_VIEW,
                Permissions.DEPOSITORY_COLUMN_VALUE_CREATE,
                Permissions.DEPOSITORY_COLUMN_VALUE_UPDATE,
                Permissions.DEPOSITORY_COLUMN_VALUE_DELETE,
                Permissions.DEPOSITORY_COLUMN_UPDATE_HISTORY_VIEW,
                Permissions.DEPOSITORY_COLUMN_UPDATE_HISTORY_CREATE,
                Permissions.DEPOSITORY_COLUMN_UPDATE_HISTORY_UPDATE,
                Permissions.DEPOSITORY_COLUMN_UPDATE_HISTORY_DELETE,
                Permissions.APPROVAL_LAYER_VIEW,
                Permissions.APPROVAL_LAYER_CREATE,
                Permissions.APPROVAL_LAYER_UPDATE,
                Permissions.APPROVAL_LAYER_DELETE,
                Permissions.APPROVAL_LAYER_ACTIVATE,
                Permissions.APPROVAL_REQUEST_VIEW,
                Permissions.APPROVAL_REQUEST_CREATE,
                Permissions.APPROVAL_REQUEST_UPDATE,
                Permissions.APPROVAL_REQUEST_DELETE,
                Permissions.APPROVAL_REQUEST_MY_PENDING_REQUEST,
                Permissions.APPROVAL_REQUEST_MY_REQUEST_HISTORIES,
                Permissions.APPROVAL_REQUEST_PROCESS,
                Permissions.VISA_CATEGORY_VIEW,
                Permissions.VISA_CATEGORY_CREATE,
                Permissions.VISA_CATEGORY_UPDATE,
                Permissions.VISA_CATEGORY_DELETE,
                Permissions.PENDING_APPROVAL_VIEW,
                Permissions.PENDING_APPROVAL_PROCESS,
                Permissions.APPROVAL_HISTORY_VIEW,
                Permissions.MY_REQUESTS_VIEW,
                Permissions.ALL_REQUESTS_VIEW,
                Permissions.COLUMN_VALUE_UPDATE_HISTORY_VIEW,
                Permissions.COLUMN_VALUE_UPDATE_HISTORY_CREATE,
              ],
            }),

            // {
            //   label: <BiUser />,
            //   key: 'user',
            //   children: (
            //     <UserManagementMenu
            //       className="mt-4"
            //       selectedKeys={[pathname]}
            //       openKeys={menu?.openMenuKeys}
            //       onOpenChange={(keys) => setActiveMenu({ openMenuKeys: keys })}
            //     />
            //   ),
            // },

            getContentAccess({
              content: {
                label: <BiUser />,
                key: 'user',
                children: (
                  <UserManagementMenu
                    className="mt-4"
                    selectedKeys={[pathname]}
                    openKeys={menu?.openMenuKeys}
                    onOpenChange={(keys) => setActiveMenu({ openMenuKeys: keys })}
                  />
                ),
              },
              allowedAccess: [
                Permissions.USER_VIEW,
                Permissions.USER_CREATE,
                Permissions.USER_UPDATE,
                Permissions.USER_DELETE,
                Permissions.ROLE_VIEW,
                Permissions.ROLE_CREATE,
                Permissions.ROLE_UPDATE,
                Permissions.ROLE_DELETE,
                Permissions.PERMISSION_VIEW,
                Permissions.PERMISSION_CREATE,
                Permissions.PERMISSION_UPDATE,
                Permissions.PERMISSION_DELETE,
                Permissions.PERMISSION_TYPE_VIEW,
                Permissions.PERMISSION_TYPE_CREATE,
                Permissions.PERMISSION_TYPE_UPDATE,
                Permissions.PERMISSION_TYPE_DELETE,
              ],
            }),
          ].filter((c) => c)}
        />

        <div
          className="spacer absolute bottom-0 left-0 w-full bg-white py-4 shadow-sm"
          style={{ boxShadow: '0 -2px 3px rgba(50, 50, 50, 0.15)' }}
        ></div>
      </Layout.Sider>

      <Layout style={styles.layout as any}>
        <Layout.Header style={styles.header as any}>
          <div
            className={cn('z-[999] flex w-full items-center', {
              'justify-between': !sidebar.opened || screens.md,
              'justify-end': sidebar.opened && !screens.md,
            })}
          >
            <div
              style={{ fontSize: 22, cursor: 'pointer' }}
              onClick={() => setSidebar({ ...sidebar, opened: !sidebar.opened })}
            >
              {sidebar.opened ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            </div>

            {(!sidebar.opened || screens.md) && (
              <div className="flex items-center justify-center gap-2 mr-[25px]">
                <WelcomeMenu />
              </div>
            )}
          </div>
        </Layout.Header>
        <Layout.Content style={styles.content as any}>{children}</Layout.Content>
        <Layout.Footer className="pb-[10px]">
          {/* <p className="text-center">
            Made With ❤️ By{' '}
            <a
              href="https://uniclienttechnologies.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Uniclient Technologies
            </a>
          </p> */}
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
