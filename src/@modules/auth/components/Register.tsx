// import { Button, Col, Form, Input, Row, message } from 'antd';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { AiTwotonePhone } from 'react-icons/ai';
// import { BsFillPersonFill } from 'react-icons/bs';
// import { MdEmail, MdLock } from 'react-icons/md';

// import RegisterThumb from 'public/images/auth-thumb.svg';
// import { useState } from 'react';

// const Register = () => {
//   const router = useRouter();
//   const [form] = Form.useForm();
//   const [messageApi, msgCtx] = message.useMessage();
//   const [feildError, setFeildError] = useState('');

//   const signUpFn = useRegister({
//     config: {
//       onSuccess(data) {
//         if (data.success) return router.push('/login');
//         if (data.message.toLowerCase().includes('email')) {
//           setFeildError('email');
//           form.resetFields(['email']);
//         } else if (data.message.toLowerCase().includes('phone')) {
//           setFeildError('phoneNumber');
//           form.resetFields(['phoneNumber']);
//         }
//       },
//     },
//   });

//   const onFinish = (values: IRegister) => {
//     delete values.confirmPassword;
//     values.role = 'Customer';
//     signUpFn.mutateAsync(values);
//   };

//   return (
//     <Row className="h-full" align="middle" justify="center">
//       {msgCtx}
//       <Col sm={24} md={10} lg={12}>
//         <div
//           className="h-full hidden md:flex justify-center items-center"
//           // style={{
//           //   background: `url(${IMAGES.AuthBg})`,
//           //   backgroundSize: 'cover',
//           //   backgroundRepeat: 'round',
//           // }}
//         >
//           <Image priority src={RegisterThumb} alt="auth-thumb" />
//         </div>
//       </Col>
//       <Col sm={24} md={14} lg={12}>
//         <div className="flex justify-center py-10">
//           <div className="xl:w-1/2 md:w-3/4 sm:w-full sm:p-6 md:p-0">
//             <div className="mb-10 text-center">
//               <img className="mx-auto mb-8" src="/images/logo.png" alt="logo" />
//               <h2 className="text-2xl font-semibold">Please Create an Account</h2>
//             </div>
//             <Form size="large" form={form} onFinish={onFinish}>
//               <Form.Item
//                 name="firstName"
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please input your first name',
//                   },
//                 ]}
//               >
//                 <Input prefix={<BsFillPersonFill />} placeholder="Your first name" type="text" />
//               </Form.Item>
//               <Form.Item
//                 name="lastName"
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please input your last name',
//                   },
//                 ]}
//               >
//                 <Input prefix={<BsFillPersonFill />} placeholder="Your last name" type="text" />
//               </Form.Item>
//               <Form.Item
//                 name="phoneNumber"
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please input your phone number',
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<AiTwotonePhone />}
//                   className={`${
//                     feildError === 'phoneNumber'
//                       ? 'ant-input-affix-wrapper-status-error'
//                       : 'ant-input-affix-wrapper-status-succcess'
//                   }`}
//                   onChange={() => setFeildError('')}
//                   placeholder="Your phone number"
//                   type="text"
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="email"
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please input your email!',
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<MdEmail />}
//                   className={`${feildError === 'email' ? 'ant-input-affix-wrapper-status-error' : ''}`}
//                   placeholder="Email"
//                   onChange={() => setFeildError('')}
//                   type="email"
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="password"
//                 rules={[
//                   { required: true, message: 'Please input new password' },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (process.env.NEXT_PUBLIC_APP_MODE === 'staging') return Promise.resolve();
//                       if (!value || /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(getFieldValue('password'))) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject(new Error('Must Have 8 character and one uppercase and lowercase!'));
//                     },
//                   }),
//                 ]}
//                 hasFeedback
//               >
//                 <Input.Password prefix={<MdLock />} placeholder="Write your password" />
//               </Form.Item>
//               <Form.Item
//                 name="confirmPassword"
//                 rules={[
//                   { required: true, message: '' },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (!value || getFieldValue('password') === value) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject(new Error("Passwords didn't matched"));
//                     },
//                   }),
//                 ]}
//                 hasFeedback
//               >
//                 <Input.Password prefix={<MdLock />} placeholder="Please confirm your password" />
//               </Form.Item>
//               <Form.Item>
//                 <Button block loading={signUpFn.isLoading} type="primary" htmlType="submit">
//                   Sign up
//                 </Button>
//               </Form.Item>
//               <p>
//                 Already have an account?{' '}
//                 <Link className="underline" href="/auth/login">
//                   Log in
//                 </Link>
//               </p>
//             </Form>
//           </div>
//         </div>
//       </Col>
//     </Row>
//   );
// };

// export default Register;
