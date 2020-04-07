import React, { useState } from 'react';
import { LoginForm, PageHeader, ActionButton, TextInput } from '../components/common';
import { Formik } from 'formik';
import * as Yup from 'yup'

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name too short")
    .max(50, "Name too long")
    .required("Name is required"),
  email: Yup.string() 
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Choose a password at least 8 characters long")
    .required("Password is required"),
  school: Yup.string()
    .min(2, "Too short")
    .required("Please add a school (or n/a)"),
  confirmPassword: Yup.string().required()
})

const ErrorMessage = ({children}) => <p className="message error-message">{children}</p>

const Signup = () => {
  return (
    <div>
      <PageHeader>Sign Up</PageHeader>
      <Formik
        onSubmit={(values) => {
          
        }}
        validationSchema={signupSchema}
        validate={(values) => {
          const { password, confirmPassword } = values;
          if (password !== confirmPassword) {
            return {
              confirmPassword: "Passwords must match"
            }
          }
        }}
        initialValues={{
          name: "",
          email: "",
          school: "",
          password: "",
          confirmPassword: "",
        }}
      >
        {({handleSubmit, touched, errors, handleChange, handleBlur, values}) => (
          <LoginForm onSubmit={handleSubmit}>
            <TextInput
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              type="name"
              placeholder="Your name"></TextInput>
              {errors.name && touched.name ?
                <ErrorMessage>{errors.name}</ErrorMessage>
                : null
              }
            <TextInput
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              type="email"
              placeholder="Your email"></TextInput>
              {errors.email && touched.email ?
                <ErrorMessage>{errors.email}</ErrorMessage>
                : null
              }
            
            <TextInput
              value={values.school}
              onChange={handleChange}
              onBlur={handleBlur}
              name="school"
              type="text"
              placeholder="Your school"></TextInput>
            {errors.school && touched.school ?
              <ErrorMessage>{errors.school}</ErrorMessage>
              : null
            }
          
            <TextInput
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type="password"
              placeholder="Your password"></TextInput>
              {errors.password && touched.password ?
                <ErrorMessage>{errors.password}</ErrorMessage>
                : null
              }
            <TextInput
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"></TextInput>
              {errors.confirmPassword && touched.confirmPassword ?
                <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                : null
              }
            <ActionButton type="submit">Sign up</ActionButton>
          </LoginForm>
        )}
      </Formik>
    </div>
  )
}

export default Signup;