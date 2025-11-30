import { ImagePaths } from '@lib/constant';
import Image from 'next/image';
import React from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const BrandLogo: React.FC<IProps> = ({ className, width = 180, height, priority = true }) => {
  const renderImageFn = (src: string) => {
    return (
      <Image
        width={width}
        height={height || width * 0.278} // Maintain aspect ratio if height not provided
        src={src}
        alt="Lol"
        className={className}
        priority={priority}
        style={{ height: height ? 'auto' : undefined }} // Maintain aspect ratio
      />
    );
  };

  return renderImageFn(ImagePaths.logo);
};

export default BrandLogo;
