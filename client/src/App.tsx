import React from 'react';

import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Main from "./components/Main"
import {    BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';
import "./assets/css/style.css"
import "./assets/css/all.min.css"
import "./assets/css/custom.css"
import "./assets/css/components.css"
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import AxiosIntreceptors from './utils/axiosInterceptors';

import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { Tokens } from './store';

import { logout } from "./utils";

function App() {

  const tokens = useSelector<{ tokens: Tokens }>(state => state.tokens) 
  const  dispatch = useDispatch();
  
  if(process.env.NODE_ENV === "development"){
    dispatch({type: "SET_URL", url: process.env.REACT_APP_DEV_URL as string});
  }

  return (
    <>
      <AxiosIntreceptors/>
      { tokens? 
        <Router>
          <ToastContainer />
          <Sidebar></Sidebar>
          <Navbar logout={logout}></Navbar>
          <Main>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes></Routes>
          </Main>
        </Router>
        :
        <Login></Login>
      }
    </>
  );
}

export default App;
