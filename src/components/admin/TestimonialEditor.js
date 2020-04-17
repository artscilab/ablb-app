import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import { TextArea, TextInput, ActionButton } from '../common';
import Checkbox from '../Checkbox'
import request from '../../utils/requests';
import { toast } from 'react-toastify';

const Title = styled.h3`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 15px;
`

const TestimonialEditor = ({selectedTestimonial}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: "",
        text: "",
        school: "",
        featured: false,
        ...selectedTestimonial
      }}
      onSubmit={async (values) => {
        console.log("here");
        
        let data = {
          testimonial: values
        }
        try {
          if (!selectedTestimonial) {
            await request.post("/testimonials", data);
            toast.success("Created testimonial!")
          } else {
            await request.patch(`/testimonials/${selectedTestimonial.id}`, data);  
            toast.success("Updated testimonial!")
          }
        } catch (e) {
          toast.error("There was an error submitting the form")
        }
      }}>
        {({handleSubmit, handleChange, values, setFieldValue}) => (
          <form onSubmit={handleSubmit}>
            <Title>{selectedTestimonial ? "Edit Testimonial" : "Add new testimonial"}</Title>
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

            <Checkbox
              name="featured"
              >Featured on homepage?</Checkbox>
            <ActionButton type="submit">Submit Changes</ActionButton>
          </form>
        )}
    </Formik>
  )
}

export default TestimonialEditor;