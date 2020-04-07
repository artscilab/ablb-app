import React, {useState} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { PageHeader, ActionButton, TextInput, LoginForm } from '../components/common';
import { Formik } from 'formik';
import styled from 'styled-components';

const Login = ({loginStatus, setLoginStatus}) => {
  const [success, setSuccess] = useState(false);

  const clickHandler = (values) => {
    setLoginStatus(true);
    setSuccess(true);
  } 

  const history = useHistory();

  return (
    <div>
      <PageHeader>Login</PageHeader>
      <Formik
        onSubmit={(values) => clickHandler(values)}
        initialValues={{
          email: "",
          password: ""
        }}
      >
        {({handleSubmit, handleChange, values}) => (
          <LoginForm onSubmit={handleSubmit}>
            <TextInput
              value={values.email}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Your email"></TextInput>
              
            <TextInput
              value={values.password}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Your password"></TextInput>

            <ActionButton type="submit">Login</ActionButton>
            <ActionButton inverted onClick={() => {
              history.push("/signup");
            }}>Sign up</ActionButton>

          </LoginForm>
            
        )}
      </Formik>
      {success && <Redirect to="/"></Redirect>}
    </div>
  )
}

export default Login;