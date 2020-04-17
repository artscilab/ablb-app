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
import Admin from './pages/admin/Admin';
import { SessionContext, getSessionCookie, setSessionCookie } from './utils/session';
import AdminRoute from './utils/AdminRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = {
  black: "#141C26",
  darkGray: "#2c333c",
  white: "#ffffff",
  green: "#0dbf7b",
  red: "#e53d0a",
  yellow: "f9af2b",
  brandon: "brandon-grotesque",
  transparentBg: "rgba(100, 100, 120, 0.3)"
}

toast.configure()

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
                <Login></Login>
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
              <AdminRoute path="/admin" component={Admin}></AdminRoute>
              <Route path="/">
                <Home></Home>
              </Route>
            </Switch>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
          </Layout>
        </Router>
      </SessionContext.Provider>
    </ThemeProvider>
  );
}

export default App;
