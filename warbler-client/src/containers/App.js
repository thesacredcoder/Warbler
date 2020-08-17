import React from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./main"
import { setAuthorizationToken, setcurrentUser } from '../store/actions/auth';
import jwtDecode from "jwt-decode";
const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  //prevent someone from manually tampering the key of jwt in the localStorage
  try{
    store.dispatch(setcurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch(e) {
    store.dispatch(setcurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar/>
        <Main />
      </div>
    </Router>
  </Provider>
);

export default App;
