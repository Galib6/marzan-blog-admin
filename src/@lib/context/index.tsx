'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { DayjsConfig, queryClient } from '@lib/config';
import useTheme from '@lib/hooks/useTheme';
import { setNotificationInstance } from '@lib/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ThemeConfig } from 'antd';
import { ConfigProvider, notification, theme as themeConfig } from 'antd';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import dynamic from 'next/dynamic';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, type PropsWithChildren } from 'react';

const PathGuard = dynamic(() => import('./PathGuard'), {
  ssr: false,
});

type TProps = PropsWithChildren<{ nextFont: (NextFontWithVariable & { originalVariableName: string })[] }>;

export const Providers = ({ nextFont, children }: TProps) => {
  const { isLight } = useTheme();
  const [notificationApi, notificationHolder] = notification.useNotification();

  DayjsConfig();

  const theme: ThemeConfig = {
    algorithm: isLight ? themeConfig.defaultAlgorithm : themeConfig.darkAlgorithm,
    token: {
      fontFamily: nextFont.map((font) => `var(${font.originalVariableName})`).join(', '),
      fontSize: 14,
      colorPrimary: '#2f3268',
      colorPrimaryActive: '#21244a',
      colorPrimaryBorder: '#2f3268',
      colorPrimaryHover: '#21244a',
      colorLinkActive: '#21244a',
      colorLinkHover: '#21244a',
      screenXSMax: 639,
      screenSMMin: 640,
      screenSM: 640,
      screenMDMax: 1023,
      screenLGMin: 1024,
      screenLG: 1024,
      screenLGMax: 1279,
      screenXLMin: 1280,
      screenXL: 1280,
      screenXLMax: 1535,
      screenXXLMin: 1536,
      screenXXL: 1536,
    },
  };

  useEffect(() => {
    setNotificationInstance(notificationApi);
  }, [notificationApi]);

  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <PathGuard>
            <main
              role="main"
              id="__main"
              className={[...nextFont.map((font) => font.variable), 'font-roboto'].join(' ')}
            >
              <NextNProgress color={'#2a2e6a'} options={{ showSpinner: false }} height={3} />
              {notificationHolder} {children}
            </main>
          </PathGuard>
        </QueryClientProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};
