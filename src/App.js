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
import NoMatch from './pages/NoMatch';
import Footer from './components/Footer';
import Lesson from './pages/Lesson';
import Testimonials from './pages/Testimonials';

const theme = {
  black: "#141C26",
  darkGray: "#2c333c",
  boxShadowColor: "#1f2834",
  white: "#ffffff",
  green: "#0dbf7b",
  red: "#e53d0a",
  yellow: "#f9af2b",
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
              <Route exact path="/catalog">
                <Catalog></Catalog>
              </Route>
              <Route exact path="/about">
                <About></About>
              </Route>
              <Route exact path="/testimonials">
                <Testimonials></Testimonials>
              </Route>
              <Route exact path="/login">
                <Login></Login>
              </Route>
              <Route exact path="/logout">
                {user === null 
                ? <Redirect to="/"></Redirect>
                : <Logout></Logout>
                }
              </Route>
              <Route exact path="/signup">
                {user === null
                ? <Signup></Signup>
                : <Redirect to="/"></Redirect> 
                }
              </Route>
              <AdminRoute path="/admin" component={Admin}></AdminRoute>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/catalog/:id">
                <Lesson></Lesson>
              </Route>
              <Route path="*">
                <NoMatch></NoMatch>
              </Route>
            </Switch>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
          </Layout>
          <Footer></Footer>
        </Router>
      </SessionContext.Provider>
    </ThemeProvider>
  );
}

export default App;
