'use client';
import { toolbox } from '@lib/utils';
import { Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface IProps {
  term?: string;
}
const BaseSearchTerm: React.FC<IProps> = ({ term = 'searchTerm' }) => {
  const router = useRouter();

  return (
    <Input
      allowClear
      prefix={<AiOutlineSearch />}
      placeholder="Search..."
      value={router?.query?.[term]}
      onChange={(e) => {
        router.push({
          query: toolbox.toCleanObject({
            ...router.query,
            [term]: e.target.value,
          }),
        });
      }}
    />
  );
};

export default BaseSearchTerm;
