import React, { useEffect, useContext, useState } from 'react';
import { SessionContext } from './session';
import request from './requests';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(SessionContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => { 
    const checkAuthStatus = async () => {
      if (user === null) {
        return (<Redirect to="/"></Redirect>)
      }
      try {
        const authorizeRequest = await request("users/authorize");
        if (authorizeRequest.status === 200) {
          setIsAdmin(true);
        }
      } catch (e) {
        console.log("Not an admin");
      }
      
      setIsBusy(false);
    }

    checkAuthStatus();
  }, [user])
  
  return (
    <>
      {isBusy ? <p>Loading</p> : 
        <Route {...rest} render={(props) => (
          isAdmin ? <Component {...props}></Component> : <Redirect to="/login"></Redirect>
        )} />
      }
    </>
  )
}

export default AdminRoute;