import { ENV } from "@lib/config";
import { Spin } from "antd";
import { IJoditEditorProps } from "jodit-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] flex justify-center items-center">
      <Spin />
    </div>
  ),
});

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const RichTextEditor: React.FC<IProps> = ({
  value = "",
  onChange,
  placeholder = "Start writing...",
  disabled = false,
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(value);
  useEffect(() => {
    setContent(value);
  }, [value]);

  const config = useMemo<IJoditEditorProps["config"]>(
    () => ({
      tabIndex: 1,
      readonly: false,
      disabled: disabled,
      placeholder: placeholder,
      height: 400,
      speechRecognize: false,
      uploader: {
        url: `${ENV.NEXT_PUBLIC_API_END_POINT}/upload-image`,
        method: "POST",
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "webp"],

        filesVariableName: function (t) {
          return "files";
        },

        prepareData: function (formdata) {
          return formdata;
        },
        isSuccess: function (e) {
          if (e.message === "success") {
            return true;
          } else {
            return false;
          }
        },
        getMessage: function (e) {
          return void 0 !== e.message || "";
        },
        process: function (res: any) {
          //success callback transfrom data to defaultHandlerSuccess use.it's up to you.
          let files = [];
          files.push(res.url);
          return {
            files: files,
            error: res.message,
            msg: res.message,
          };
        },
        error: function (this: any, e: Error) {
          this.j?.e?.fire("errorMessage", e?.message, "error", 4000);
        },
        defaultHandlerSuccess: function (this: any, resp: any) {
          // `this` is the editor.
          const j = this;
          if (resp?.files && resp?.files.length) {
            const tagName = "img";
            resp.files?.forEach((filename: string, index: number) => {
              //edetor insertimg function
              const elm = j.createInside.element(tagName);
              elm.setAttribute("src", filename);
              j.s.insertImage(
                elm as HTMLImageElement,
                null,
                j.o.imageDefaultWidth
              );
            });
          }
        },
        defaultHandlerError: function (this: any, e) {
          this?.j?.e?.fire("errorMessage", e?.message);
        },
        contentType: function (e) {
          return (
            (void 0 === this.jodit?.ownerWindow?.FormData ||
              "string" == typeof e) &&
            "application/x-www-form-urlencoded; charset=UTF-8"
          );
        },
      },
    }),
    [placeholder, disabled]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={(newContent) => {
        setContent(newContent);
      }}
      onChange={(newContent) => {
        onChange(newContent);
      }}
    />
  );
};

export default RichTextEditor;
