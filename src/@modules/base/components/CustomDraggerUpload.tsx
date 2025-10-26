import { ENV } from '@lib/config';
import { toolbox } from '@lib/utils';
import { notification, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import React, { useState } from 'react';
import { IoDocumentTextOutline } from 'react-icons/io5';

interface IUploadProps {
  listType?: 'text' | 'picture' | 'picture-card';
  maxCount?: number;
  onChange?: (url: string) => void;
  showUploadList?: boolean;
  acceptedType?: string[];
  sizeLimit?: number;
  onRemove?: () => void;
  crop?: boolean;
  disabled?: boolean;
  countrySelected?: boolean;
}
const CustomDraggerUpload: React.FC<IUploadProps> = ({
  listType = 'picture-card',
  maxCount = 1,
  onChange,
  showUploadList = true,
  acceptedType = ['jpeg', 'jpg', 'png', 'svg'],
  sizeLimit = 2,
  onRemove,
  crop = false,
  disabled,
}) => {
  const [image, setImage] = useState({
    url: '',
    isLoading: false,
  });

  const beforeUpload = (file: RcFile) => {
    const accepted = toolbox.isNotEmpty(acceptedType.filter((item) => file.name?.toLowerCase()?.endsWith(item)));

    if (!accepted) {
      notification.error({
        message: `You can only upload ${acceptedType.join(' / ')} file!`,
        duration: 1,
      });
    }
    const isLimit = file.size / 1024 / 1024 < sizeLimit;
    if (!isLimit) {
      notification.error({
        message: 'Image must smaller than 2MB!',
        duration: 1,
      });
    }
    return accepted && isLimit;
  };

  const handleUpload: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file?.status === 'uploading') {
      setImage({
        url: '',
        isLoading: true,
      });
    }
    if (info.file?.status === 'done') {
      setImage({
        url: info.file?.response?.data[0],
        isLoading: false,
      });
      onChange && onChange(info.file?.response?.data[0]);
    }

    if (info.file?.status === 'removed') {
      setImage({
        url: '',
        isLoading: false,
      });
      onChange && onChange(null);
    }
  };

  return (
    <React.Fragment>
      {crop ? (
        <ImgCrop rotationSlider aspectSlider={true} quality={1}>
          <Upload.Dragger
            name="files"
            listType={listType}
            // headers={{
            //   'x-client-name': 'WEB',
            //   Authorization: `Bearer ${storage?.getToken()}`,
            // }}
            showUploadList={showUploadList}
            maxCount={maxCount}
            onPreview={() => window.open(image.url)}
            action={`${ENV.NEXT_PUBLIC_API_END_POINT}/files`}
            beforeUpload={beforeUpload}
            onChange={handleUpload}
          >
            <div className="p-5">
              <div className="flex justify-center mb-2">
                <IoDocumentTextOutline className="text-3xl" />
              </div>
              <p className="text-lg">
                <span className="underline">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm">Maximum file size 50 MB.</p>
            </div>
          </Upload.Dragger>
        </ImgCrop>
      ) : (
        <Upload.Dragger
          name="files"
          listType={listType}
          // headers={{
          //   'x-client-name': 'WEB',
          //   Authorization: `Bearer ${storage?.getToken()}`,
          // }}
          showUploadList={showUploadList}
          maxCount={maxCount}
          disabled={disabled}
          // onPreview={() => window.open(image.url)}
          action={`${ENV.NEXT_PUBLIC_API_END_POINT}/files`}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
        >
          <div className="p-5">
            <div className="flex justify-center mb-2">
              <IoDocumentTextOutline className="text-3xl" />
            </div>
            <p className="text-lg">
              <span className="underline">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm">Maximum file size 50 MB.</p>
          </div>
        </Upload.Dragger>
      )}
    </React.Fragment>
  );
};

export default CustomDraggerUpload;
