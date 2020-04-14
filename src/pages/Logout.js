import React, {useEffect, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { SessionContext } from '../utils/session';


const Logout = () => {
  const { user, authChangeHandler } = useContext(SessionContext);

  useEffect(() => {
    authChangeHandler(null)
  }, [authChangeHandler])

  return (
    <Redirect to="/"></Redirect>
  )
}

export default Logout;