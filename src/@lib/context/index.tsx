'use client';
import { queryClient } from '@lib/config';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { NextFont } from 'next/dist/compiled/@next/font';
import React from 'react';

type AppProviderProps = {
  nextFont?: NextFont;
  children: React.ReactNode;
};
export const AppProvider = ({ nextFont, children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#6200ee',
            // controlOutline: 'transparent',
            fontFamily: 'var(--font-lato)',
          },
          components: {
            Button: {
              borderRadius: 4,
            },
            Grid: {
              // screenXSMin: 320,
              screenSMMin: 640,
              screenMDMin: 768,
              screenLGMin: 1024,
              screenXLMin: 1280,
              screenXXLMin: 1536,
            },
          },
        }}
      >
        <main className={nextFont?.className}>{children}</main>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
