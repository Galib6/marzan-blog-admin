"use client";
import { toolbox } from "@lib/utils";
import CustomUpload from "@modules/base/components/CustomUpload";
import ImagePreview from "@modules/base/components/ImagePreview";
import RichTextEditor from "@modules/base/components/RichTextEditor";
import { IFormType } from "@modules/base/interfaces";
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { IArticle, IArticleCreate } from "src/@api/article/interfaces";
import { useArticleCategorys } from "src/@api/articleCategory/hook";

interface IProps {
  form: FormInstance;
  fromType?: IFormType;
  initialValues?: IArticle;
  onFinish?: (values: IArticleCreate) => void;
  onFinishFailed?: (errorInfo: any) => void;
  loading?: boolean;
}

const ArticleForm: React.FC<IProps> = ({
  form,
  fromType,
  initialValues,
  onFinish,
  onFinishFailed,
  loading,
}) => {
  const [slug, setSlug] = useState(null);
  const [image, setImage] = useState(null);

  // reset form value
  useEffect(() => {
    form?.resetFields();
    setImage(initialValues?.thumbUrl);
  }, [form, fromType, initialValues]);
  console.log(image);
  const onSubmitForm = (values: IArticleCreate) => {
    values.thumbUrl = image;
    onFinish(values);
  };

  const { isLoading, data } = useArticleCategorys({
    options: {
      page: Number(1),
      limit: Number(10),
    },
  });

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
        <Col xs={24} md={24} lg={24}>
          <Form.Item
            label="Thumb Image"
            name="thumbUrl"
            rules={[
              {
                required: true,
                message: "Please enter thumb Url!",
              },
            ]}
          >
            <div className="flex justify-center gap-5">
              {image && (
                <ImagePreview
                  className="inline-block"
                  height={100}
                  width={100}
                  src={image}
                  alt=""
                />
              )}
              <CustomUpload onChange={(url) => setImage(url)} />
            </div>
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={24}>
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
        <Col xs={24} md={24} lg={24}>
          <Form.Item label="Category" name="categorySlug">
            <Select placeholder="Select Category">
              {data?.data?.map((x) => (
                <Select.Option key={x._id} value={x.slug}>
                  {x.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={24} lg={24}>
          <Form.Item label="Content" name="content">
            <RichTextEditor />
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

export default ArticleForm;
