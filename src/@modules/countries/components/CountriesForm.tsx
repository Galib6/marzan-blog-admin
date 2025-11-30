'use client';
import FloatInput from '@base/antd/components/FloatInput';
import FloatInputNumber from '@base/antd/components/FloatInputNumber';
import FloatSelect from '@base/antd/components/FloatSelect';
import { Button, Col, Form, FormInstance, Radio, Row, Select } from 'antd';
import { useEffect } from 'react';
import { countryVisaTypeArray } from '../lib/enums';
import { ICountry, ICountryCreate } from '../lib/interfaces';

interface IProps {
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<ICountry>;
  onFinish?: (values: ICountryCreate) => void;
  loading?: boolean;
}

const CountriesForm: React.FC<IProps> = ({ form, initialValues, onFinish, loading }) => {
  // reset form value
  useEffect(() => {
    form?.resetFields();
  }, [form, initialValues]);

  const handleFinish = (values) => {
    onFinish(values);
  };

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={handleFinish}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            className="!mb-0"
            // label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please select a title!',
              },
            ]}
          >
            <FloatInput placeholder="Title" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className="!mb-0"
            // label="Visa Type"
            name="visaType"
            rules={[
              {
                required: true,
                message: 'Please select a visa type!',
              },
            ]}
          >
            <FloatSelect
              showSearch
              allowClear
              virtual={false}
              placeholder="Visa Type"
              filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
            >
              {countryVisaTypeArray?.map((item) => (
                <Select.Option key={item} value={item} title={item}>
                  <p className="capitalize">{item}</p>
                </Select.Option>
              ))}
            </FloatSelect>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className="!mb-0"
            // label="Order Priority"
            name="orderPriority"
            rules={[
              {
                required: true,
                message: 'Please enter order priority!',
              },
            ]}
          >
            <FloatInputNumber placeholder="Priority" className="!w-full" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item className="!mb-0" label="Active" name="isActive">
            <Radio.Group buttonStyle="solid" className="w-full">
              <Radio.Button className="w-1/2 text-center" value={true}>
                Yes
              </Radio.Button>
              <Radio.Button className="w-1/2 text-center" value={false}>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item className="!mb-0 text-right">
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CountriesForm;
