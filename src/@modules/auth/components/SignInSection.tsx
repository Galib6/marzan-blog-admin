'use client';

import BrandLogo from '@base/components/BrandLogo';
import CustomLink from '@base/components/CustomLink';
import ThemeToggler from '@base/components/ThemeToggler';
import { Messages, Paths } from '@lib/constant';
import { Button, Form, Input, message } from 'antd';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { REDIRECT_PREFIX } from '../lib/constant';
import { useSignIn } from '../lib/hooks';
import { setAuthSession } from '../lib/utils/client';

const SignInSection = () => {
  const searchParams = useSearchParams();
  const [messageApi, messageHolder] = message.useMessage();
  const redirectUrl = searchParams.get(REDIRECT_PREFIX)?.toString();

  const signInFn = useSignIn({
    config: {
      onSuccess(data) {
        if (!data.success) return;
        setAuthSession(data.data);

        messageApi.loading(Messages.signIn(), 1).then(() => {
          window.location.replace(redirectUrl || Paths.admin.root);
        });
      },
    },
  });

  return (
    <section>
      {messageHolder}
      <div className="container">
        <div className="flex justify-center items-center min-h-screen pb-8 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center w-full max-w-[850px] bg-white dark:bg-black/20 p-4 rounded-2xl md:p-8">
            <div className="hidden md:block text-center">
              <Image src="/images/auth.svg" alt="Sign In Illustration" width={300} height={300} />
            </div>
            <div>
              <div className="flex flex-col items-center md:items-start gap-2 mb-4">
                <ThemeToggler className="absolute top-4 right-4" />
                <CustomLink href={Paths.root}>
                  <BrandLogo />
                </CustomLink>
                <h3 className="text-xl font-medium md:text-2xl dark:text-white">Sign in to your account</h3>
              </div>
              <Form size="large" onFinish={signInFn.mutate}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Please enter a valid email address!',
                    },
                    {
                      required: true,
                      message: 'Email is required!',
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Password is required!',
                    },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters long!',
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item className="!mb-0">
                  <Button type="primary" htmlType="submit" loading={signInFn.isPending} className="w-full">
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInSection;
