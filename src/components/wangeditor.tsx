import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

interface MyEditorProps{
    onChange?:(str:string)=>void,
    value?:string
}
function MyEditor(props:MyEditorProps) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState('')


  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {} // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      console.log(editor.getHtml());
      
      setEditor(null)
    }
  }, [editor])
  let changecontext = (editor:IDomEditor)=>{
   let text = editor.getHtml()
   setHtml(text)
   props.onChange!(text)
  }
  

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => changecontext(editor)}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
    </>
  )
}

export default MyEditor