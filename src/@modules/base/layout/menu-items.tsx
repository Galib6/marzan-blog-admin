import { paths } from '@lib/constant';
import { storage } from '@lib/utils';
import { MenuProps } from 'antd';
import Link from 'next/link';
import { AiOutlineDashboard, AiOutlineLogout, AiOutlineSafety, AiOutlineUser } from 'react-icons/ai';

const welcomeMenu = [
  {
    key: 'Profile',
    icon: <AiOutlineUser />,
    label: 'Profile',
  },
  {
    key: 'Security',
    icon: <AiOutlineSafety />,
    label: 'Security',
  },
  {
    key: 'Logout',
    icon: <AiOutlineLogout />,
    label: 'Logout',
    onClick: () => {
      storage.clear();
      window.location.reload();
    },
  },
];

// main menu items
const mainMenu: MenuProps['items'] = [
  {
    key: paths.articleCategory.list,
    icon: <AiOutlineDashboard />,
    label: <Link href={paths.articleCategory.list}>Article Category</Link>,
  },
  {
    key: paths.article.list,
    icon: <AiOutlineDashboard />,
    label: <Link href={paths.article.list}>Article</Link>,
  },
];

const menuItems = {
  welcomeMenu,
  mainMenu,
};

export default menuItems;
