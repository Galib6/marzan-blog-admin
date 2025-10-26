"use client";
import { apiMessages, paths } from "@lib/constant";
import { storage } from "@lib/utils";
import { Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEmail, MdLock } from "react-icons/md";

import { useLogin } from "src/@api/auth/hook";
import { checkAuth } from "./utils";

const Login = () => {
  const router = useRouter();
  const [messageApi, msgCtx] = message.useMessage();
  const isAuthenticated = checkAuth();
  const loginFn = useLogin({
    config: {
      onSuccess(data) {
        if (!data?.status) return;
        storage.setToken(data?.token);
        messageApi.success(apiMessages.login);
      },
    },
  });

  if (isAuthenticated) {
    router.push(paths.root);
  }

  return (
    <Row className="h-full" align="middle" justify="center">
      {msgCtx}
      <Col sm={24} md={24} lg={24}>
        <div className="flex justify-center py-10">
          <div className="xl:w-1/2 md:w-3/4 sm:w-full sm:p-6 md:p-0">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold">
                Welcome Back! Please Login
              </h2>
            </div>
            <Form
              size="large"
              onFinish={(values) => {
                loginFn.mutateAsync(values);
              }}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input prefix={<MdEmail />} placeholder="Email" type="email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    // min: 6,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password prefix={<MdLock />} placeholder="Password" />
              </Form.Item>
              <div className="flex justify-between mb-6">
                <Checkbox>Remember me</Checkbox>
                <Link href="/">Forgot password</Link>
              </div>
              <Form.Item>
                <Button
                  block
                  loading={loginFn.isLoading}
                  type="primary"
                  htmlType="submit"
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
