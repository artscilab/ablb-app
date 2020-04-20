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
import { useField } from 'formik';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  margin-bottom: 15px;
`

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 20px;
  display: block;
`
const RoleSelector = ({children, ...props}) => {
  const [field, meta, helpers] = useField({...props});
  const roles = [
    {label: "Admin", value: "admin"}, 
    {label: "User", value: "user"}
  ]

  return (
    <SelectorContainer>
      <Label>Choose role</Label>
      <ABLBSelect
        isSearchable={false}
        {...field}
        isClearable={false}
        value={roles ? roles.find(option => option.value === meta.value) : ''}
        options={roles}
        onChange={l => helpers.setValue(l !== null ? l.value : "")}></ABLBSelect>
    </SelectorContainer>
  )
}
const UserSection = () => {
  const users = useResource("users");
  const [selectedUser, setSelectedUser] = useState(undefined);
  return (
    <Section>
      <SectionContent>
        <SectionHeader>Users</SectionHeader>
        <SectionBody>
          <p>Select user to edit</p>

          {users && (
            <ABLBSelect 
              isSearchable={true}
              options={users} 
              getOptionLabel={t => t.name} 
              getOptionValue={t => t.id}
              onChange={t => setSelectedUser(t)}
              ></ABLBSelect>
            )}
        </SectionBody>
      </SectionContent>
      
      <SectionEditor>
        <Editor
          resourceName="user"
          apiPath="users"
          validationSchema={
            Yup.object().shape({
              name: Yup.string()
                .min(2, "Name too short")
                .max(50, "Name too long")
                .required("Name is required"),
              email: Yup.string() 
                .email("Invalid email")
                .required("Email is required"),
              password: Yup.string()
                .min(8, "Choose a password at least 8 characters long"),
              school: Yup.string()
                .min(2, "Too short")
                .required("Please add a school (or n/a)"),
              confirmPassword: Yup.string(),
            })
          }
          validate={(values) => {
            const { password, confirmPassword } = values;
            if (password !== confirmPassword) {
              return {
                confirmPassword: "Passwords must match"
              }
            }
          }}
          selected={selectedUser}
          fields={[
            {
              component: TextInput,
              type: "text",
              name: "name",
              placeholder: "User's name",
              initialValue: ""
            },
            {
              component: TextInput,
              type: "email",
              name: "email",
              placeholder: "User email",
              initialValue: ""
            },
            {
              component: TextInput,
              type: "text",
              name: "school",
              placeholder: "User's school",
              initialValue: ""
            },
            {
              component: TextInput,
              type: "password",
              name: "password",
              placeholder: "Password",
              initialValue: ""
            },
            {
              component: TextInput,
              type: "password",
              name: "confirmPassword",
              placeholder: "Confirm password",
              initialValue: ""
            },
            {
              component: RoleSelector,
              type: "text",
              name: "role",
            }
          ]}/>
      </SectionEditor>
    </Section>
  )
}

export default UserSection;