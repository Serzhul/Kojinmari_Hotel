import { RichTextEditor, Link, useRichTextEditorContext } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import styled from '@emotion/styled'
import { useRef } from 'react'
import { IconPhotoPlus } from '@tabler/icons-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { REVIEW_IMAGE_URL } from 'constants/variables'

function InsertImageControl() {
  const { editor } = useRichTextEditorContext()

  const inputRef = useRef<HTMLInputElement>(null)

  const uploadEditorImage = async (file: File) => {
    const supabase = createClientComponentClient()

    try {
      const { data } = await supabase.storage
        .from('review-images')
        .upload(`test/${file.name}`, file)
      return data?.path
    } catch (error) {
      console.error(error)
    }
  }

  const uploadImage = () => inputRef?.current?.click()

  const handleFileChange = async () => {
    if (
      inputRef.current &&
      inputRef.current.files &&
      inputRef.current.files.length > 0
    ) {
      for (let i = 0; i < inputRef.current.files.length; i += 1) {
        const file = inputRef.current.files[i]

        const url = await uploadEditorImage(file)

        if (url)
          editor
            .chain()
            .focus()
            .setImage({ src: `${REVIEW_IMAGE_URL}/${url}` })
            .run()
      }
    }
  }

  return (
    <>
      <RichTextEditor.Control
        onClick={uploadImage}
        aria-label="업로드 이미지"
        title="업로드 이미지"
      >
        <IconPhotoPlus stroke={1.5} size="1rem" />
      </RichTextEditor.Control>

      <input
        type="file"
        accept="image/*"
        aria-label="업로드 이미지"
        value=""
        ref={inputRef}
        style={{ display: `none` }}
        onChange={handleFileChange}
      />
    </>
  )
}

function CustomEditor({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  })

  return (
    <EditorContainer>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <InsertImageControl />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </EditorContainer>
  )
}

export default CustomEditor

const EditorContainer = styled.div`
  margin-top: 10rem;
`
