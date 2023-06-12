"use client"

import React, { useEffect, useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"

interface InlineEditorProps extends React.ComponentProps<typeof TextareaAutosize> {
  isEditing?: boolean
  setIsEditing?: (val: boolean) => void
}

export const InlineEditor = React.forwardRef<HTMLTextAreaElement, InlineEditorProps>(
  ({ isEditing, setIsEditing, ...props }, ref) => {
    const [text, setText] = useState(props.defaultValue)

    useEffect(() => {
      setText(props.value)
    }, [props.value])

    if (isEditing) {
      return (
        <TextareaAutosize
          {...props}
          ref={ref}
          onFocus={(e) => {
            props?.onFocus?.(e)
            e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
          }}
          onBlur={(e) => {
            setIsEditing(false)
            props?.onBlur?.(e)
          }}
          onChange={(e) => {
            props?.onChange?.(e)
            setText(e.target.value)
          }}
          autoFocus
        />
      )
    }

    return <p className={props.className + " cursor-pointer truncate text-left"}>{text}</p>
  }
)

InlineEditor.displayName = "InlineEditor"

export default InlineEditor
