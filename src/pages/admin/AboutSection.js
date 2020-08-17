import React, { useState, useEffect } from 'react';
import request from '../../utils/requests';
import { 
  Section,
  SectionContent,
  SectionHeader,
  SectionBody,
  SectionEditor } from '../../components/admin/common';
import RichTextEditor from 'react-rte';
import { ActionButton } from '../../components/common';
import styled from 'styled-components'
import { toast } from 'react-toastify';

const LeftHandContent = styled.div`
  max-width: 300px;
  margin-right: 15px;

  p {
    margin-bottom: 15px
  }
`

const AboutSection = () => {
  const [content, setContent] = useState(RichTextEditor.createEmptyValue())

  useEffect(() => {
    const getAboutPageContents = async () => {
      try {
        let r = await request.get("/about")
        setContent(RichTextEditor.createValueFromString(r.data.content, 'html'))

      } catch (e) {
        console.log("couldn't get content")
      }
    }

    getAboutPageContents();
  }, [])

  return (
    <Section>
      <LeftHandContent>
        <SectionHeader>About Page Content</SectionHeader>
        <p>This is the content for the about page. Use the toolbar to style text and add links.</p>
        <ActionButton
          onClick={async () => {
            try {
              await request.post("/about/content", {
                htmlContent: content.toString('html')
              })
              toast.success("Successfully updated about page content")
            } catch (e) {
              console.log(e)
              toast.error("Unable to submit changes")
            }
          }}
        >Save changes</ActionButton>
      </LeftHandContent>
      <div>
        <RichTextEditor 
          className="aboutEditorContainer"
          editorClassName="aboutEditor"
          toolbarClassName="aboutEditorToolbar"
          rootStyle={{
            background: "rgba(100, 100, 120, 0.3)"
          }}
          value={content}
          onChange={(val) => {
            setContent(val)
          }}></RichTextEditor>
      
      </div>
    </Section>
  )
}

export default AboutSection;