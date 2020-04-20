import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import { ActionButton, ErrorMessage, AdminForm } from '../common';
import request from '../../utils/requests';
import { toast } from 'react-toastify';

const Title = styled.h3`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 25px;
  font-family: ${props => props.theme.brandon};
`

const Editor = ({apiPath, selected, resourceName, fields, validationSchema, validate}) => {
  let initialValues = {}

  fields.forEach(f => {
    initialValues[f.name] = f.initialValue
  })

  return (
    <Formik
      validate={validate}
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={{
        ...initialValues,
        ...selected
      }}
      onSubmit={async (values) => {
        let data = {}
        data[resourceName] = values;

        try {
          if (!selected) {
            await request.post(`/${apiPath}`, data);
            toast.success(`Successfully created ${resourceName}`)
          } else {
            await request.patch(`/${apiPath}/${selected.id}`, data);  
            toast.success(`Successfully updated ${resourceName}`)
          }
          window.location.reload();
        } catch (e) {
          toast.error("There was an error submitting the form")
        }
      }}>
        {({handleSubmit, handleChange, values, errors, touched, handleBlur}) => (
          <AdminForm onSubmit={handleSubmit}>
            <Title>{selected ? `Edit ${resourceName}`: `Add new ${resourceName}`}</Title>
            {fields.map((field) => {
              const Component = field.component;
              return (
                <div key={field.name}>
                  <Component
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onBlur={handleBlur}
                    onChange={handleChange}>{field.label}</Component>
                    
                  {errors[field.name] && touched[field.name] && (
                    <ErrorMessage>{errors[field.name]}</ErrorMessage>
                  )}
                </div>
              )
            })}
            <ActionButton type="submit">Submit Changes</ActionButton>
          </AdminForm>
        )}
    </Formik>
  )
}

export default Editor;