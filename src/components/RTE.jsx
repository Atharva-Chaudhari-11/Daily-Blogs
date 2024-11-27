import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

// here only imp thing is control which pass the control from this component to where we call this.
export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>
        {label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
          apiKey='apwqm0nx7qaeodhhky2il70cd98larpe6deij36xn8r809x2'
          initialValue={defaultValue}
          init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
              ],
              toolbar:
              "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
          }}
          onEditorChange={onChange}
          />
        )}
      // render have first callback 
      />

    </div>
  )
}


/* 
Q1- It is easy to use the editor ! we also use the editor in different filds for
  using Editor component in different component, using the forwardef and
 just pass the editor component in different component, but here we trying to use the 
 concept of [{Controllers} from react-hook-form]
 :::=>
<Editor 
initialValue='default value'
init={
  {
    branding : false ,
    menubar:true,
    height:500,
    plugins:[
    ],
    toolbar:[]   
  }
}
/>     

*/