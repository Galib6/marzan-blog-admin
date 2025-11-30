'use client';

import FilePreviewer from '@base/components/FilePreviewer';
import { Button, Col, Form, FormInstance, Input, InputNumber, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';
import { ICategoryCreate } from '../lib/interfaces';

interface IProps {
  form: FormInstance<any>;
  initialValues?: ICategoryCreate;
  onFinish?: (values: ICategoryCreate) => void;
  onFinishFailed?: (errorInfo: any) => void;
  loading?: boolean;
}

const CategoryForm: React.FC<IProps> = ({ form, initialValues, onFinish, onFinishFailed, loading }) => {
  const [image, setImage] = useState<string>(null);

  // reset form value
  useEffect(() => {
    form?.resetFields();
    setImage(null);
  }, [form, initialValues]);

  const onSubmitForm = (values: ICategoryCreate) => {
    values.image = image || initialValues?.image;
    onFinish(values);
  };

  return (
    <Form
      form={form}
      size="large"
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmitForm}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={{ sm: 16, md: 20, lg: 32 }}>
        <Col span={24}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter a title!',
              },
            ]}
          >
            <Input placeholder="Enter a title" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24}>
          <Form.Item label="orderPriority" name="orderPriority">
            <InputNumber className="w-full" placeholder="Enter order priority" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="description" name="description">
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="image"
            label={
              <p>
                flag(255x180) (<span className="text-red-500">jpeg, png, svg - less than 2MB</span>)
              </p>
            }
          >
            <div className="flex gap-4 items-center">
              <div className="uploaded-image-view">
                <FilePreviewer src={image || initialValues?.image} alt="icon" />
              </div>
            </div>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Is Active" name="isActive">
            <Radio.Group buttonStyle="solid" className="w-full">
              <Radio.Button className="w-1/2 text-center" value={true}>
                True
              </Radio.Button>
              <Radio.Button className="w-1/2 text-center" value={false}>
                False
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item className="text-right">
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CategoryForm;
