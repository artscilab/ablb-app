import React, {useState} from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Login from './pages/Login';
import Logout from './pages/Logout';

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
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header loginStatus={loginStatus}></Header>
        <Layout>
          <Switch>
            <Route path="/catalog">
              <Catalog></Catalog>
            </Route>
            <Route path="/about">
              <About></About>
            </Route>
            <Route path="/login">
              <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus}></Login>
            </Route>
            <Route path="/logout">
              <Logout loginStatus={loginStatus} setLoginStatus={setLoginStatus}></Logout>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
