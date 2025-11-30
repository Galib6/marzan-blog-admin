'use client';
import CodeTool from '@editorjs/code';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import { AxiosSecureInstance } from '@lib/config';
import { Button, message, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';

interface IProps {
  initialData?: OutputData;
  onSave: (data: OutputData) => Promise<void>;
  loading?: boolean;
  articleName?: string;
  onBack?: () => void;
}

const ArticleEditor: React.FC<IProps> = ({ initialData, onSave, loading, articleName, onBack }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) {
      // Custom file upload handler using axios secure instance
      const fileUploadHandler = async (file: File) => {
        try {
          const formData = new FormData();
          formData.append('files', file); // Use 'files' (plural) as per API spec
          formData.append('folder', 'default');

          const response = await AxiosSecureInstance.post('http://[::1]:4500/api/v1/files', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (response.data?.success) {
            return {
              success: 1,
              file: {
                url: response.data.data?.url || response.data.data?.link || response.data.data,
              },
            };
          }
          throw new Error('Upload failed');
        } catch (error) {
          console.error('Upload error:', error);
          message.error('File upload failed');
          return {
            success: 0,
            file: {
              url: '',
            },
          };
        }
      };

      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
          paragraph: Paragraph,
          quote: Quote,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: fileUploadHandler,
                uploadByUrl: async (url: string) => {
                  try {
                    const formData = new FormData();
                    const blob = await fetch(url).then((r) => r.blob());
                    formData.append('files', blob); // Use 'files' (plural) as per API spec
                    formData.append('folder', 'default');

                    const response = await AxiosSecureInstance.post(
                      'http://[::1]:4500/api/v1/files',
                      formData,
                      {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        },
                      },
                    );

                    if (response.data?.success) {
                      return {
                        success: 1,
                        file: {
                          url: response.data.data?.url || response.data.data?.link || response.data.data,
                        },
                      };
                    }
                    throw new Error('Upload failed');
                  } catch (error) {
                    console.error('Upload error:', error);
                    message.error('File upload failed');
                    return {
                      success: 0,
                      file: {
                        url: '',
                      },
                    };
                  }
                },
              },
            },
          },
          code: CodeTool,
          inlineCode: InlineCode,
        },
        data: initialData,
        onReady: () => {
          setIsReady(true);
        },
        placeholder: "Let's write an awesome story!",
      });
      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    if (editorRef.current) {
      try {
        const savedData = await editorRef.current.save();
        await onSave(savedData);
        message.success('Content saved successfully!');
      } catch (error) {
        console.error('Saving failed: ', error);
        message.error('Failed to save content');
      }
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen().catch(() => {
        setIsFullscreen(true);
      });
      setIsFullscreen(true);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      style={{
        backgroundColor: isFullscreen ? '#fff' : 'transparent',
      }}
    >
      <div className={`${isFullscreen ? 'p-6 h-full flex flex-col' : 'p-6'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button onClick={onBack} className="hover:bg-gray-100">
                ← Back
              </Button>
            )}
            <h1 className="text-2xl font-bold">{articleName || 'Article Editor'}</h1>
          </div>
          <Space>
            <Button
              icon={isFullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            />
            <Button type="primary" onClick={handleSave} loading={loading} disabled={!isReady}>
              Save Content
            </Button>
          </Space>
        </div>

        <div
          id="editorjs"
          className={`prose prose-sm flex-1 border rounded-lg bg-white overflow-auto max-w-none ${isFullscreen ? '' : 'min-h-[600px]'}`}
          style={{
            padding: '20px',
            boxSizing: 'border-box',
          }}
        />

        {articleName && (
          <div className="mt-4 pt-4 border-t text-gray-600 text-sm">
            <span className="font-semibold">Article:</span> {articleName}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleEditor;
