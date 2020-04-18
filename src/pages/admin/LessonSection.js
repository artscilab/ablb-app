import React, { useState } from 'react';
import { useResource } from '../../utils/requests';
import { ABLBSelect, TextInput, TextArea } from '../../components/common';
import { 
  Section,
  SectionContent,
  SectionHeader,
  SectionBody,
  SectionEditor } from '../../components/admin/common';
import Editor from '../../components/admin/editor';
import * as Yup from 'yup';

const LessonSection = () => {
  const lessons = useResource("lessons")
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <Section>
      <SectionContent>
        <SectionHeader>Lessons</SectionHeader>
        <SectionBody>
          <p>Select lesson to edit</p>
          {lessons && (
            <ABLBSelect
              options={lessons}
              getOptionLabel={l => l.title}
              getOptionValue={l => l.id}
              onChange={l => setSelectedLesson(l)}></ABLBSelect>
          )}
        </SectionBody>
      </SectionContent>
      <SectionEditor>
        <Editor
          resourceName="lesson"
          apiPath="lessons"
          selected={selectedLesson}
          validationSchema={
            Yup.object().shape({
              title: Yup.string().required(),
              description: Yup.string().required()
            })
          }
          fields={[
            {
              component: TextInput,
              type: "text",
              name: "title",
              placeholder: "Lesson title",
              initialValue: "",
            },
            {
              component: TextArea,
              type: "text",
              name: "description",
              placeholder: "Lesson description",
              initialValue: ""
            }
          ]}></Editor>
      </SectionEditor>
    </Section>
  )
}

export default LessonSection;