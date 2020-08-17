import React, { useState, useContext } from 'react';
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
import NumberChooser from '../../components/NumberChooser';
import { useField } from 'formik';
import styled from 'styled-components'
import FileUpload from '../../components/FileUpload';
import ReactPlayer from 'react-player'
import { SessionContext } from '../../utils/session';

const SelectorContainer = styled.div`
  margin-bottom: 15px;
`

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 20px;
  display: block;
`

const PlayerContainer = styled.div`
  width: 100%;
  height: auto;
`

const LessonSelector = ({children, ...props}) => {
  const lessons = useResource("lessons");
  const [field, meta, helpers] = useField({...props});

  return (
    <SelectorContainer>
      <Label>Choose lesson</Label>
      <ABLBSelect
        {...field}
        value={lessons ? lessons.find(option => option.id === meta.value) : ''}
        options={lessons}
        getOptionLabel={l => l.title}
        getOptionValue={l => l.id}
        placeholder="Start typing to search lessons"
        onChange={l => helpers.setValue(l !== null ? l.id : "")}></ABLBSelect>
    </SelectorContainer>
  )
}

const VideoSection = () => {
  const videos = useResource("videos")
  const [selectedVideo, setSelectedVideo] = useState(null);
  const {user} = useContext(SessionContext);

  return (
    <Section>
      <SectionContent>
        <SectionHeader>Videos</SectionHeader>
        <SectionBody>
          <p>Select video to edit</p>
          {videos && (
            <SelectorContainer>
              <ABLBSelect
                options={videos}
                getOptionLabel={l => l.title}
                getOptionValue={l => l.id}
                onChange={l => setSelectedVideo(l)}></ABLBSelect>
            </SelectorContainer>
          )}
          {selectedVideo && selectedVideo.videoLink && (
            <ReactPlayer
              controls
              wrapper={PlayerContainer}
              width="500px"
              height="auto"
              url={`/api/videos/${selectedVideo.id}/stream?token=${user.token}`} />
          )}
        </SectionBody>
      </SectionContent>
      <SectionEditor>
        <Editor
          resourceName="video"
          apiPath="videos"
          selected={selectedVideo}
          validationSchema={
            Yup.object().shape({
              description: Yup.string().required(),
              title: Yup.string().required(),
              partNumber: Yup.number().default("1"),
              lessonId: Yup.number().required()
            })
          }
          fields={[
            {
              component: TextInput,
              type: "text",
              name: "title",
              placeholder: "Video title",
              initialValue: "",
            },
            {
              component: TextArea,
              type: "text",
              name: "description",
              placeholder: "Video description",
              initialValue: ""
            },
            {
              component: NumberChooser,
              type: "number",
              name: "partNumber",
              placeholder: "1",
              initialValue: 1,
              label: "Part number"
            },
            {
              component: LessonSelector,
              type: "number",
              name: "lessonId",
            }
          ]}></Editor>
          {selectedVideo && (
            <FileUpload 
              resourceName="videos"
              prompt="Drop video file here, or click to browse"
              maxSize={1048576 * 500}
              formDataName="videoFile"
              accept="video/mp4"
              id={selectedVideo.id}></FileUpload>
          )}
      </SectionEditor>
    </Section>
  )
}

export default VideoSection;