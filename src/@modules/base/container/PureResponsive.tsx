'use client';

import { useEffect, useState } from 'react';

interface IProps {
  show: 'mobile' | 'desktop';
  content: any;
}
const PureResponsive: React.FC<IProps> = ({ show, content }) => {
  //   const screen = Grid.useBreakpoint();

  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
      setIsDesktop(false);
    } else {
      setIsMobile(false);
      setIsDesktop(true);
    }
  }, []);

  if (show === 'mobile' && isMobile) {
    return content;
  }
  if (show === 'desktop' && isDesktop) {
    return content;
  }
  return null;
};

export default PureResponsive;
