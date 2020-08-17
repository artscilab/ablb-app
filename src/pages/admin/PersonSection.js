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
import styled from 'styled-components'
import FileUpload from '../../components/FileUpload';

const SelectorContainer = styled.div`
  margin-bottom: 15px;
`

const ImageContainer = styled.div`
  width: 100%;
  height: auto;

  img {
    max-width: 100%;
    height: auto;
  }
`

const PersonSection = () => {
  const people = useResource("people")
  const [selectedPerson, setSelectedPerson] = useState(null);

  console.log(people);
  
  return (
    <Section>
      <SectionContent>
        <SectionHeader>People</SectionHeader>
        <SectionBody>
          <p>Select person to edit</p>
          {people && (
            <SelectorContainer>
              <ABLBSelect
                options={people}
                getOptionLabel={l => l.name}
                getOptionValue={l => l.id}
                onChange={l => setSelectedPerson(l)}></ABLBSelect>
            </SelectorContainer>
          )}
          {selectedPerson && selectedPerson.imageurl && (
            <ImageContainer>
              <img src={selectedPerson.imageurl} alt={"Profile"}></img>
            </ImageContainer>
          )}
        </SectionBody>
      </SectionContent>
      <SectionEditor>
        <Editor
          resourceName="people"
          apiPath="people"
          selected={selectedPerson}
          validationSchema={
            Yup.object().shape({
              name: Yup.string().required(),
              bio: Yup.string().required(),
              school: Yup.string(),
              personalLink: Yup.string().url().required()
            })
          }
          fields={[
            {
              component: TextInput,
              type: "text",
              name: "name",
              placeholder: "Name",
              initialValue: "",
            },
            {
              component: TextInput,
              type: "text",
              name: "school",
              placeholder: "School",
              initialValue: "",
            },
            {
              component: TextArea,
              type: "text",
              name: "bio",
              placeholder: "Bio",
              initialValue: ""
            },
            {
              component: TextInput,
              type: "text",
              name: "personalLink",
              placeholder: "Personal Link",
              initialValue: "",
            }
          ]}></Editor>
          {selectedPerson && (
            <FileUpload 
              resourceName="people"
              prompt="Drop profile picture here, or click to browse"
              formDataName="profilePicture"
              accept="image/*"
              maxSize={1048576 * 2}
              id={selectedPerson.id}></FileUpload>
          )}
      </SectionEditor>
    </Section>
  )
}

export default PersonSection;