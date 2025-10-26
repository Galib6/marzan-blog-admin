import { ENV } from '@lib/config';
import { toolbox } from '@lib/utils';
import { Button, notification, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import React, { ReactNode, useState } from 'react';
import { AiOutlineLoading, AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';

interface IUploadProps {
  listType?: 'text' | 'picture' | 'picture-card';
  maxCount?: number;
  onChange?: (url: string) => void;
  showUploadList?: boolean;
  acceptedType?: string[];
  sizeLimit?: number;
  body?: ReactNode;
  crop?: boolean;
}
const CustomUpload: React.FC<IUploadProps> = ({
  listType = 'picture-card',
  maxCount = 1,
  onChange,
  showUploadList = false,
  acceptedType = ['jpeg', 'jpg', 'png', 'svg'],
  sizeLimit = 2,
  body,
  crop = false,
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
      onChange && onChange(info.file?.response?.url);
      setImage({
        url: info.file?.response?.url,
        isLoading: false,
      });
    }
  };

  return (
    <React.Fragment>
      {crop ? (
        <ImgCrop rotationSlider aspectSlider={true} quality={1}>
          <Upload
            name="files"
            listType={listType}
            // headers={{
            //   'x-client-name': 'WEB',
            //   Authorization: `Bearer ${storage?.getToken()}`,
            // }}
            showUploadList={showUploadList}
            maxCount={maxCount}
            onPreview={() => window.open(image.url)}
            action={`${ENV.NEXT_PUBLIC_API_END_POINT}/upload-image`}
            beforeUpload={beforeUpload}
            onChange={handleUpload}
          >
            {body ? (
              body
            ) : listType === 'picture-card' ? (
              <div>
                <div className="flex justify-center">
                  {image.isLoading ? <AiOutlineLoading className="animate-spin" /> : <AiOutlinePlus />}
                </div>
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            ) : (
              <Button icon={image.isLoading ? <AiOutlineLoading className="animate-spin" /> : <AiOutlineUpload />}>
                Click to Upload
              </Button>
            )}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          name="files"
          listType={listType}
          // headers={{
          //   'x-client-name': 'WEB',
          //   Authorization: `Bearer ${storage?.getToken()}`,
          // }}
          showUploadList={showUploadList}
          maxCount={maxCount}
          onPreview={() => window.open(image.url)}
          action={`${ENV.NEXT_PUBLIC_API_END_POINT}/upload-image`}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
        >
          {body ? (
            body
          ) : listType === 'picture-card' ? (
            <div>
              <div className="flex justify-center">
                {image.isLoading ? <AiOutlineLoading className="animate-spin" /> : <AiOutlinePlus />}
              </div>
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          ) : (
            <Button icon={image.isLoading ? <AiOutlineLoading className="animate-spin" /> : <AiOutlineUpload />}>
              Click to Upload
            </Button>
          )}
        </Upload>
      )}
    </React.Fragment>
  );
};

export default CustomUpload;
