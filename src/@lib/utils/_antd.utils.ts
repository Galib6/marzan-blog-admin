import { notification } from 'antd';

export const beforeUpload = (file: any) => {
  const acceptedType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg';
  if (!acceptedType) {
    notification.error({
      message: 'You can only upload JPG/PNG/SVG file!',
      duration: 1,
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification.error({
      message: 'Image must smaller than 2MB!',
      duration: 1,
    });
  }
  return acceptedType && isLt2M;
};

export const handleUpload = (info: any) => {
  if (info.file?.status === 'uploading') {
    return {
      url: '',
      isLoading: true,
    };
  }
  if (info.file?.status === 'done') {
    return {
      url: info.file?.response?.payload?.link[0],
      isLoading: false,
    };
  }
};

export const formValidateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
