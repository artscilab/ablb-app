import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({loginStatus, setLoginStatus}) => {
  setLoginStatus(false);
  return (
    <Redirect to="/"></Redirect>
  )
}

export default Logout;