import CustomLink from '@base/components/CustomLink';
import { Paths } from '@lib/constant';
import { getRbacMenuItems } from '@modules/auth/lib/utils/client';
import { Menu } from 'antd';
import { FaLightbulb } from 'react-icons/fa';

interface IProps {
  className?: string;
  selectedKeys: string[];
  openKeys: string[];
  onOpenChange: (openKeys: string[]) => void;
}

const MainMenu: React.FC<IProps> = ({ className, selectedKeys, openKeys, onOpenChange }) => {
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
          key: Paths.admin.root,
          icon: <FaLightbulb />,
          label: <CustomLink href={Paths.admin.category.list}>Visa Category</CustomLink>,
        },
        // {
        //   key: Paths.admin.countries.list,
        //   icon: <FaGlobe />,
        //   allowedAccess: [Permissions.COUNTRY_VIEW],
        //   label: (
        //     <CustomLink href={Toolbox.appendPagination(Paths.admin.countries.list)}>Countries</CustomLink>
        //   ),
        // },
        // {
        //   key: Paths.admin.visaCategories.list,
        //   icon: <FaPassport />,
        //   label: (
        //     <CustomLink href={Toolbox.appendPagination(Paths.admin.visaCategories.list)}>
        //       Visa Categories
        //     </CustomLink>
        //   ),
        //   allowedAccess: [Permissions.VISA_CATEGORY_VIEW],
        // },
        // {
        //   key: Paths.admin.depositoryColumns.list,
        //   icon: <RiUserStarFill />,
        //   label: (
        //     <CustomLink href={Toolbox.appendPagination(Paths.admin.depositoryColumns.list)}>
        //       Depository Columns
        //     </CustomLink>
        //   ),
        //   allowedAccess: [Permissions.DEPOSITORY_COLUMN_OPTION_VIEW],
        // },
        // {
        //   key: Paths.admin.approvalLayers.list,
        //   icon: <MdLayers />,
        //   label: (
        //     <CustomLink href={Toolbox.appendPagination(Paths.admin.approvalLayers.list)}>
        //       Approval Layers
        //     </CustomLink>
        //   ),

        //   allowedAccess: [Permissions.APPROVAL_LAYER_VIEW, Permissions.ALL_REQUESTS_VIEW],
        // },
        // {
        //   key: Paths.admin.approvalRequest.root,
        //   icon: <FaCodePullRequest />,
        //   label: 'Approval Requests',
        //   allowedAccess: [
        //     Permissions.PENDING_APPROVAL_VIEW,
        //     Permissions.PENDING_APPROVAL_PROCESS,
        //     Permissions.APPROVAL_HISTORY_VIEW,
        //     Permissions.ALL_REQUESTS_VIEW,
        //   ],

        //   children: [
        //     {
        //       key: Paths.admin.approvalRequest.list,
        //       icon: <VscGitPullRequestDraft />,
        //       label: 'My Approval Request',
        //       allowedAccess: [
        //         Permissions.PENDING_APPROVAL_VIEW,
        //         Permissions.PENDING_APPROVAL_PROCESS,
        //         Permissions.APPROVAL_HISTORY_VIEW,
        //       ],
        //       children: [
        //         {
        //           key: Paths.admin.approvalRequest.pendingApproval.list,
        //           icon: <CiBoxList />,
        //           allowedAccess: [Permissions.PENDING_APPROVAL_VIEW],

        //           label: (
        //             <CustomLink
        //               href={Toolbox.appendPagination(Paths.admin.approvalRequest.pendingApproval.list)}
        //             >
        //               List
        //             </CustomLink>
        //           ),
        //         },
        //         {
        //           key: Paths.admin.approvalRequest.myApprovalHistory.root,
        //           icon: <MdHistory />,
        //           allowedAccess: [Permissions.APPROVAL_HISTORY_VIEW],

        //           label: (
        //             <CustomLink
        //               href={Toolbox.appendPagination(Paths.admin.approvalRequest.myApprovalHistory.root)}
        //             >
        //               History
        //             </CustomLink>
        //           ),
        //         },
        //       ],
        //     },
        //     {
        //       key: Paths.admin.approvalRequest.myRequests.list,
        //       icon: <BsChatSquareQuote />,
        //       allowedAccess: [Permissions.MY_REQUESTS_VIEW],
        //       label: (
        //         <CustomLink href={Toolbox.appendPagination(Paths.admin.approvalRequest.myRequests.list)}>
        //           My Request
        //         </CustomLink>
        //       ),
        //     },
        //     {
        //       key: Paths.admin.approvalRequest.allRequests.list,
        //       icon: <AiTwotoneWallet />,
        //       allowedAccess: [Permissions.ALL_REQUESTS_VIEW],
        //       label: (
        //         <CustomLink href={Toolbox.appendPagination(Paths.admin.approvalRequest.allRequests.list)}>
        //           All Request
        //         </CustomLink>
        //       ),
        //     },
        //   ],
        // },
        // {
        //   key: Paths.admin.columnValueUpdateHistory.list,
        //   icon: <MdLayers />,

        //   label: (
        //     <CustomLink href={Toolbox.appendPagination(Paths.admin.columnValueUpdateHistory.list)}>
        //       Information Update History
        //     </CustomLink>
        //   ),

        //   allowedAccess: [Permissions.COLUMN_VALUE_UPDATE_HISTORY_VIEW],
        // },
      ])}
    />
  );
};

export default MainMenu;
