"use client"

import React, { useEffect, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"

interface InlineEditorProps extends React.ComponentProps<typeof TextareaAutosize> {}

export const InlineEditor = (props: InlineEditorProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(props.defaultValue)

  useEffect(() => {
    setText(props.value)
  }, [props.value])

  if (isEditing) {
    return (
      <TextareaAutosize
        {...props}
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
        maxRows={1}
        autoFocus
      />
    )
  }

  return (
    <p
      onDoubleClick={() => setIsEditing(true)}
      className={props.className + " cursor-pointer truncate text-left"}
    >
      {text}
    </p>
  )
}

export default InlineEditor
