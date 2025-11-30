'use client';

import CustomUploader from '@base/components/CustomUploader';
import InfiniteScrollSelect from '@base/components/InfiniteScrollSelect';
import { useInfiniteCategories } from '@modules/category/lib/hooks';
import { ICategory } from '@modules/category/lib/interfaces';
import { Button, Col, Form, FormInstance, Input, InputNumber, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';
import { IArticleCreate } from '../lib/interfaces';

interface IProps {
  form: FormInstance<any>;
  initialValues?: IArticleCreate;
  onFinish?: (values: IArticleCreate) => void;
  onFinishFailed?: (errorInfo: any) => void;
  loading?: boolean;
}

const ArticleForm: React.FC<IProps> = ({ form, initialValues, onFinish, onFinishFailed, loading }) => {
  const [thumb, setThumb] = useState<string>(null);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');

  const categoryQuery = useInfiniteCategories({
    options: { limit: 10, searchTerm: categorySearchTerm },
  });

  // reset form value
  useEffect(() => {
    form?.resetFields();
    setThumb(null);
  }, [form, initialValues]);

  const onSubmitForm = (values: IArticleCreate) => {
    values.thumb = thumb || initialValues?.thumb;

    // Transform categories from IDs to objects
    if (values.categories && Array.isArray(values.categories)) {
      values.categories = values.categories.map((c: any) => (typeof c === 'string' ? { id: c } : c));
    }

    onFinish(values);
  };

  return (
    <Form
      form={form}
      size="large"
      layout="vertical"
      initialValues={{
        ...initialValues,
        categories: initialValues?.categories?.map((c) => c.id),
      }}
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

        <Col span={24}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter a name!',
              },
            ]}
          >
            <Input placeholder="Enter a name" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Slug"
            name="slug"
            rules={[
              {
                required: true,
                message: 'Please enter a slug!',
              },
            ]}
          >
            <Input placeholder="Enter a slug" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Summary" name="summary">
            <Input.TextArea placeholder="Enter summary" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Categories" name="categories">
            <InfiniteScrollSelect<ICategory>
              mode="multiple"
              query={categoryQuery}
              onChangeSearchTerm={setCategorySearchTerm}
              option={({ item }) => ({ label: item.title, value: item.id })}
              placeholder="Select categories"
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Thumbnail">
            <CustomUploader
              listType="picture-card"
              maxCount={1}
              initialValues={initialValues?.thumb ? [initialValues.thumb] : []}
              onChange={(urls) => setThumb(urls[0])}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24}>
          <Form.Item label="Order Priority" name="orderPriority">
            <InputNumber style={{ width: '100%' }} className="w-full" placeholder="Enter order priority" />
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

export default ArticleForm;
