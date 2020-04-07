import React from 'react';
import * as Cookies from 'js-cookie';

const COOKIE_NAME = "__ablb_session";

export const setSessionCookie = (session) => {
  Cookies.remove(COOKIE_NAME);
  Cookies.set(COOKIE_NAME, session);
}

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get(COOKIE_NAME);

  if (sessionCookie === undefined) {
    return null;
  } else {
    return JSON.parse(sessionCookie);
  }
}

export const SessionContext = React.createContext(getSessionCookie());