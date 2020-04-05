import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, ActionButton, TextInput } from '../components/common';
import { Formik } from 'formik';
import styled from 'styled-components';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  
  input, button {
    margin-bottom: 25px;
  }
  max-width: 500px;
`

const Login = ({loginStatus, setLoginStatus}) => {
  const [success, setSuccess] = useState(false);

  const clickHandler = (values) => {
    setLoginStatus(true);
    setSuccess(true);
  } 
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
              name="email"
              placeholder="Your password"></TextInput>

            <ActionButton type="submit">Login</ActionButton>
          </LoginForm>
            
        )}
      </Formik>
      {success && <Redirect to="/"></Redirect>}
    </div>
  )
}

export default Login;