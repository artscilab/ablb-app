import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import { TextArea, TextInput, ActionButton } from '../common';
import request from '../../utils/requests';

const Title = styled.h3`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 15px;
`

const TestimonialEditor = ({selectedTestimonial}) => {
  return (
    <Formik
      initialValues={{
        name: "",
        text: "",
        school: "",
        ...selectedTestimonial
      }}
      onSubmit={async (values) => {
        console.log("here");
        
        let data = {
          testimonial: values
        }
        if (!selectedTestimonial) {
          console.log("here")
          let creation = await request.post("/testimonials", data);
          window.location.reload()
        }
      }}>
        {({handleSubmit, handleChange, values}) => (
          <form onSubmit={handleSubmit}>
            <Title>Edit Testimonial</Title>
            <TextInput 
              type="text" 
              name="name" 
              value={values.name} 
              onChange={handleChange}
              placeholder="Display Name"></TextInput>
            <TextInput 
              type="text" 
              name="school" 
              value={values.school} 
              onChange={handleChange}
              placeholder="School"></TextInput>
            <TextArea 
              name="text" 
              value={values.text} 
              onChange={handleChange}
              placeholder="Testimonial Text"></TextArea>
            <ActionButton type="submit">Submit Changes</ActionButton>
          </form>
        )}
    </Formik>
  )
}

export default TestimonialEditor;