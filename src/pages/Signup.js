import React, { useState } from 'react';
import { LoginForm, PageHeader, ActionButton, TextInput, ErrorMessage, PageContent } from '../components/common';
import { Formik } from 'formik';
import request from '../utils/requests';
import * as Yup from 'yup'
import {Link, useLocation} from 'react-router-dom';
import styled from "styled-components";

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

const SignupMessage = styled.p`
  margin-bottom: 35px;
`

const Signup = () => {
  const [success, setSuccess] = useState(false)
  
  const showMessage = new URLSearchParams(useLocation().search).get("showMessage");

  console.log(showMessage)
  return (
    <div>
      <PageHeader>Sign Up</PageHeader>
      <PageContent>

        {showMessage && (
          <SignupMessage className="lead">
            You need to be signed in to see that page!
          </SignupMessage>
        )}
        <Formik
          onSubmit={async (values) => {
            let x = await request.post("/users", {
              user: {
                ...values
              }
            })
            if (x.status === 200) {
              setSuccess(true)
            }
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
              <Link to="login">
                Login Instead
              </Link>
              {success && (
                <>
                <p>Success!</p>
                <p>
                  <Link to="/login">
                    <ActionButton inverted>Login</ActionButton>
                  </Link>
                </p>
                </>
              )}
            </LoginForm>
          )}
        </Formik>
      </PageContent>
    </div>
  )
}

export default Signup;