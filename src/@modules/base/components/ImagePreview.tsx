import { Image, ImageProps } from 'antd';
import React from 'react';

interface IProps extends ImageProps {
  src: string;
  alt?: string;
}
const ImagePreview: React.FC<IProps> = ({ src, alt = 'icon', ...props }) => {
  const imageHolder = '/images/image-holder.png';

  if (src?.endsWith('.pdf')) {
    return (
      <div
        style={{ height: props.height || 100, width: props.width || 100 }}
        onClick={() => window.open(src)}
        className="cursor-pointer relative overflow-hidden"
      >
        <iframe src={src} width={props.width || 100} height={props.height || 100} style={{ overflow: 'hidden' }} />
        <div className="absolute top-0 left-0 h-full w-full opacity-0 hover:opacity-100 hover:bg-[#33333380] flex items-center justify-center">
          <p className="text-white">Preview pdf</p>
        </div>
      </div>
    );
  }

  return <Image {...props} src={src} alt={alt} width={props.width || 100} height={props.height || 100} />;
};
export default ImagePreview;