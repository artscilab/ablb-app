import React, {useState} from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './components/Header';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import { SessionContext, getSessionCookie, setSessionCookie } from './utils/session';

const theme = {
  black: "#141C26",
  darkGray: "#2c333c",
  white: "#ffffff",
  green: "#0dbf7b",
  red: "#e53d0a",
  yellow: "f9af2b",
  brandon: "brandon-grotesque"
}

function App() {
  const [user, setUser] = useState(getSessionCookie());
  const authChangeHandler = (cookie) => {
    setUser(cookie)
    setSessionCookie(cookie)
  } 
  return (
    <ThemeProvider theme={theme}>
      <SessionContext.Provider value={{user, authChangeHandler}}>
        <Router>
          <Header></Header>
          <Layout>
            <Switch>
              <Route path="/catalog">
                <Catalog></Catalog>
              </Route>
              <Route path="/about">
                <About></About>
              </Route>
              <Route path="/login">
                {user === null 
                ? <Login></Login>
                : <Redirect to="/"></Redirect>
                }
              </Route>
              <Route path="/logout">
                {user === null 
                ? <Redirect to="/"></Redirect>
                : <Logout></Logout>
                }
              </Route>
              <Route path="/signup">
                {user === null
                ? <Signup></Signup>
                : <Redirect to="/"></Redirect> 
                }
              </Route>
              <Route path="/">
                <Home></Home>
              </Route>
            </Switch>
          </Layout>
        </Router>
      </SessionContext.Provider>
    </ThemeProvider>
  );
}

export default App;
