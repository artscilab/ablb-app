import React, {useState, useContext} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { PageHeader, ActionButton, TextInput, LoginForm } from '../components/common';
import { Formik } from 'formik';
import styled from 'styled-components';
import request from '../utils/requests';
import { SessionContext } from '../utils/session';

const Login = () => {
  const [success, setSuccess] = useState(false);
  const {user, authChangeHandler} = useContext(SessionContext);

  const clickHandler = (values) => {
    authChangeHandler(values)
  } 

  const history = useHistory();

  return (
    <div>
      <PageHeader>Login</PageHeader>
      <Formik
        onSubmit={async (values) => {
          let x = await request.post("/users/login", {
            user: {
              ...values
            }
          })
          console.log(x);
          if (x.status === 200) {
            authChangeHandler(x.data.user)
          }
        }}
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