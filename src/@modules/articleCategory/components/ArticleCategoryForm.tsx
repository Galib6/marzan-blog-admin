"use client";
import { toolbox } from "@lib/utils";
import { IFormType } from "@modules/base/interfaces";
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  IArticleCategory,
  IArticleCategoryCreate,
} from "src/@api/articleCategory/interface";

interface IProps {
  form: FormInstance;
  fromType?: IFormType;
  initialValues?: IArticleCategory;
  onFinish?: (values: IArticleCategoryCreate) => void;
  onFinishFailed?: (errorInfo: any) => void;
  loading?: boolean;
}

const ArticleCategoryForm: React.FC<IProps> = ({
  form,
  fromType,
  initialValues,
  onFinish,
  onFinishFailed,
  loading,
}) => {
  const [slug, setSlug] = useState(null);
  const [galleryData, setGalleryData] = useState(null);

  // reset form value
  useEffect(() => {
    if (fromType === "update") {
      form?.resetFields();
    }
  }, [form, fromType, initialValues]);

  const onSubmitForm = (values: IArticleCategoryCreate) => {
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
      <Row gutter={32}>
        <Col xs={24} md={12} lg={12}>
          <Form.Item
            label="title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter title!",
              },
            ]}
          >
            <Input
              placeholder="Enter title"
              onBlur={() => toolbox?.generateSlug(form, "title", "slug")}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <Form.Item label="description" name="description">
            <Input placeholder="Enter description" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="slug"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || /^[^\s?]+$/.test(getFieldValue("slug"))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Space will not allowed"));
                },
              }),
            ]}
            // hasFeedback
            label="Slug"
          >
            <Input
              disabled={!slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Slug"
              className="h-[40px]"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} lg={12}>
          <Form.Item label="orderPriority" name="orderPriority">
            <InputNumber className="w-full" placeholder="Enter orderPriority" />
          </Form.Item>
        </Col>

        <Col xs={12} md={6} lg={6}>
          <Form.Item label="is Active" name="isActive" valuePropName="checked">
            <Switch />
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

export default ArticleCategoryForm;
