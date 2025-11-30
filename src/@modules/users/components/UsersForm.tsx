import FloatInput from '@base/antd/components/FloatInput';
import FloatInputPassword from '@base/antd/components/FloatInputPassword';
import FloatSelect from '@base/antd/components/FloatSelect';
import { TId } from '@base/interfaces';
import { Permissions } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import Authorization from '@modules/auth/components/Authorization';
import { hasAccessPermission } from '@modules/auth/lib/utils/client';
import { useRoleFind } from '@modules/roles/lib/hooks';
import { Button, Col, Form, FormInstance, Radio, Row } from 'antd';
import React, { useEffect } from 'react';
import { IUserCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  isRoles?: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IUserCreate>;
  onFinish: (values: IUserCreate) => void;
}

const UsersForm: React.FC<IProps> = ({
  isLoading,
  isRoles = true,
  form,
  formType = 'create',
  initialValues,
  onFinish,
}) => {
  const rolesQuery = useRoleFind({
    config: {
      queryKey: [],
      enabled: isRoles && hasAccessPermission([Permissions.ROLE_VIEW]),
    },
    options: {
      page: 1,
      limit: 300,
      isActive: true,
    },
  });

  const handleFinishFn = (values) => {
    let sanitizedRoles = [];

    if (isRoles && hasAccessPermission([Permissions.ROLE_VIEW])) {
      const currentSanitizedRoles = values?.roles?.map((role: TId) => ({ role: role }));
      sanitizedRoles = Toolbox.computeArrayDiffs(initialValues?.roles, currentSanitizedRoles, 'role');
    }

    onFinish({ ...values, roles: sanitizedRoles });
  };

  useEffect(() => {
    form.resetFields();
  }, [formType, form, initialValues]);

  return (
    <Form
      autoComplete="off"
      size="large"
      layout="vertical"
      form={form}
      initialValues={{
        ...initialValues,
        roles: initialValues?.roles?.map((role) => role?.role),
      }}
      onFinish={handleFinishFn}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: 'First name is required!',
              },
            ]}
            className="!mb-0"
          >
            <FloatInput placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Last name is required!',
              },
            ]}
            className="!mb-0"
          >
            <FloatInput placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="password"
            rules={[
              {
                required: formType === 'create',
                message: 'Password is required!',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters long!',
              },
            ]}
            className="!mb-0"
          >
            <FloatInputPassword placeholder="Password" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Email is not valid!',
              },
              {
                required: true,
                message: 'Email is required!',
              },
            ]}
            className="!mb-0"
          >
            <FloatInput placeholder="Email" />
          </Form.Item>
        </Col>
        {isRoles && (
          <Authorization allowedAccess={[Permissions.ROLE_VIEW]}>
            <Col xs={24} md={24}>
              <Form.Item className="!mb-0" name="roles">
                <FloatSelect
                  allowClear
                  showSearch
                  mode="multiple"
                  virtual={false}
                  placeholder="Roles"
                  options={rolesQuery.data?.data?.map((role) => ({
                    key: role.id,
                    label: role.title,
                    value: role.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Authorization>
        )}
        <Col xs={24}>
          <Form.Item name="isActive" className="!mb-0">
            <Radio.Group buttonStyle="solid" className="w-full text-center">
              <Radio.Button className="w-1/2" value={true}>
                Active
              </Radio.Button>
              <Radio.Button className="w-1/2" value={false}>
                Inactive
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item className="text-right !mb-0">
            <Button loading={isLoading} type="primary" htmlType="submit">
              {formType === 'create' ? 'Submit' : 'Update'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UsersForm;
