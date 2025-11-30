'use client';

import ArticleEditor from '@modules/article/components/ArticleEditor';
import { useArticle, useUpdateArticle } from '@modules/article/lib/hooks';
import { Spin, message } from 'antd';
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface IProps {
  params: Promise<{ id: string }>;
}

export default function ArticleContentPage({ params }: IProps) {
  const router = useRouter();
  const { id } = use(params);
  const { data, isLoading } = useArticle({ id });
  const updateArticle = useUpdateArticle();

  if (isLoading) {
    return <Spin className="flex justify-center items-center h-screen" />;
  }

  const handleSave = async (content: any) => {
    try {
      const res = await updateArticle.mutateAsync({
        id,
        data: { content },
      });
      if (res?.success) {
        message.success('Content saved successfully!');
      } else {
        message.error(res?.message || 'Failed to save content');
      }
    } catch {
      message.error('An error occurred while saving');
    }
  };

  const handleBack = () => {
    router.push('/admin/article/list');
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <ArticleEditor
        articleName={data?.data?.title}
        initialData={data?.data?.content}
        onSave={handleSave}
        loading={updateArticle.isPending}
        onBack={handleBack}
      />
    </div>
  );
}
