"use client";

import { get } from "http";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { OutputData } from "@editorjs/editorjs";
``;
import { MoveHorizontal } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { useDeepCompareEffect } from "react-use";

const SimpleEditor = dynamic(
  () => import("./simple-editor").then((mod) => mod.SimpleEditor),
  {
    ssr: false,
  }
);

type EditorData = {
  title?: string;
  content?: OutputData;
};

interface EditorProps {
  data?: EditorData;
  id?: string;
  onChange?: (data?: EditorData) => void;
  holder: string;
  isPreview?: boolean;
}

export const Editor = ({
  data,
  onChange,
  holder,
  isPreview = false,
}: EditorProps) => {
  const [editorWidth, setEditorWidth] = useState<"default" | "full">("default");
  const { register, control, watch, reset, getValues } = useForm<EditorData>({
    defaultValues: {
      content: data?.content,
      title: data?.title,
    },
  });

  useEffect(() => {
    const { unsubscribe } = watch((formData) => {
      onChange?.({
        content: formData.content as OutputData,
        title: formData.title,
      });
    });
    return () => unsubscribe();
  }, [onChange, watch]);

  useDeepCompareEffect(() => {
    if (data?.content)
      reset({
        ...getValues(),
        content: data?.content,
        title: data?.title,
      });
  }, [data?.title, data?.content, reset, holder]);

  return (
    <div
      className={
        editorWidth === "default"
          ? "prose prose-neutral mx-auto w-[720px] max-w-none p-4 transition-all dark:prose-invert"
          : "prose prose-neutral mx-auto w-full max-w-none px-12 py-4 transition-all dark:prose-invert"
      }
    >
      {editorWidth === "default" ? (
        <div
          className="flex items-center h-6 gap-2 opacity-0 cursor-pointer select-none hover:opacity-100 "
          onClick={() => setEditorWidth("full")}
        >
          <MoveHorizontal className="w-4 h-4 text-shade-secondary" />
          <p className="text-[13px] font-medium text-shade-primary">
            Wide Layout
          </p>
        </div>
      ) : (
        <div
          className="flex items-center h-6 gap-2 opacity-0 cursor-pointer select-none hover:opacity-100"
          onClick={() => setEditorWidth("default")}
        >
          <MoveHorizontal className="w-4 h-4 text-shade-secondary" />
          <p className="text-[13px] font-medium">Default Layout</p>
        </div>
      )}

      <TextareaAutosize
        autoFocus
        disabled={isPreview}
        id="title"
        defaultValue={data?.title}
        placeholder="Untitled notes"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            return false;
          }
        }}
        className="min-h-12 w-full resize-none appearance-none overflow-hidden bg-transparent  text-3xl font-medium leading-[3.75rem] focus:outline-none"
        {...register("title")}
      />
      {/* {isPreview ? (
        <Preview data={data} />
      ) : ( */}
      <Controller
        name="content"
        control={control}
        render={({ field: { value, onChange: editorOnChange } }) => (
          <SimpleEditor
            isPreview={isPreview}
            onChange={(e) => {
              editorOnChange(e);
            }}
            data={value}
            holder={holder}
          />
        )}
      />
      {/* )} */}
    </div>
  );
};

export default Editor;
