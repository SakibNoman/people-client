import { createContext, useState } from "react";
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from "./Components/Login/PrivateRoute";

//context api creating
export const UserContext = createContext();

//notification method
export const notifications = (title, message, bgColor, duration) => {
  store.addNotification({
    title: title,
    message: message,
    type: bgColor,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: duration,
      onScreen: true
    }
  });
}

function App() {

  //useState hook to store loggedInUser data
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <ReactNotification />
      <Router>
        <Switch>
          <Route path="/login" >
            <Login></Login>
          </Route>
          <PrivateRoute path="/home" >
            <Home></Home>
          </PrivateRoute>
          <Route exact path="/" >
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
