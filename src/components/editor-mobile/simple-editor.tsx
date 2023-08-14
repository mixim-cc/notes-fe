"use client";

import { useCallback, useEffect, useRef } from "react";
import EditorJS, { LogLevels, OutputData } from "@editorjs/editorjs";

import { EDITOR_TOOLS } from "@/components/editor/editor-tools";

type EditorProps = {
  data?: OutputData;
  onChange?: (val: OutputData) => void;
  holder?: string;
  isPreview?: boolean;
};

export const SimpleEditorMobile = ({
  holder,
  onChange,
  data,
  isPreview,
}: EditorProps) => {
  const ref = useRef<EditorJS>();

  const initalizeEditor = useCallback(async () => {
    // const EditorJS = (await import("@editorjs/editorjs")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder,
        onReady() {
          ref.current = editor;
        },
        async onChange(api, event) {
          let content = await api.saver.save();

          onChange?.(content);
        },
        placeholder: "Press Tab for controls",
        inlineToolbar: true,
        data: data,
        tools: EDITOR_TOOLS,
        readOnly: isPreview,
      });
    }
  }, [data, holder, onChange]);

  useEffect(() => {
    if (ref.current) {
      ref?.current?.destroy?.();
    }

    initalizeEditor();

    return () => {
      if (ref.current) {
        ref?.current?.destroy?.();
      }
    };
  }, [holder]);

  return <div id={holder} />;
};

export default SimpleEditorMobile;
