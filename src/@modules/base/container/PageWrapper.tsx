'use client';
import Head from 'next/head';
import React from 'react';

interface IMeta {
  title?: string;
  baseTitle?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  url?: string;
  keywords?: string[];
}

interface IProps extends IMeta {
  children: React.ReactNode;
}
const PageWrapper: React.FC<IProps> = ({ children, ...customMeta }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Blog App</title>
      </Head>
      {children}
    </React.Fragment>
  );
};

export default PageWrapper;
