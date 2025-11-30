'use client';
import { Toolbox } from '@lib/utils';
import { useSignOut } from '@modules/auth/lib/hooks';
import { useAuthSession } from '@modules/auth/lib/utils/client';
import { useUser } from '@modules/users/lib/hooks';
import { Avatar, Dropdown } from 'antd';
import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

const signOutFn = useSignOut;

interface IProps {
  className?: string;
}

const WelcomeMenu: React.FC<IProps> = () => {
  // const [_, setProfileModalOpen] = useState(false);
  const user = useAuthSession();

  const userData = useUser({
    id: user?.user?.id as string,
    config: {
      enabled: !!user?.user?.id,
    } as any,
  });

  const items = [
    // {
    //   key: 'Profile',
    //   icon: <AiOutlineUser className="text-blue-500" />,
    //   label: (
    //     <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
    //       Profile
    //     </span>
    //   ),
    //   onClick: () => setProfileModalOpen(true),
    //   disabled: true,
    //   className: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
    // },
    // {
    //   type: 'divider' as const,
    //   key: 'divider-1',
    // },
    {
      key: 'Signout',
      icon: <AiOutlineLogout className="text-red-500" />,
      label: (
        <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
          Sign out
        </span>
      ),
      onClick: signOutFn,
      disabled: false,
      className: 'hover:bg-red-50 dark:hover:bg-red-900/20',
    },
  ];

  return (
    <React.Fragment>
      <Dropdown
        menu={{ items: items }}
        trigger={['click']}
        placement="bottomRight"
        classNames={{
          root: 'user-dropdown',
        }}
      >
        <div className="flex justify-center items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group">
          <Avatar
            shape="square"
            className="cursor-pointer transition-transform duration-200 group-hover:scale-105 shadow-sm"
            style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
            size={32}
          >
            {userData?.data?.data?.firstName?.slice(0, 1)}
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {Toolbox.safeConcat(userData?.data?.data?.firstName, userData?.data?.data?.lastName)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userData?.data?.data?.email}</p>
          </div>
          <svg
            className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-all duration-200 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </Dropdown>
    </React.Fragment>
  );
};

export default WelcomeMenu;
