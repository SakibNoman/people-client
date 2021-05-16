import { createContext, useState } from "react";
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from "./Components/Login/PrivateRoute";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <Router>
        <Switch>
          <PrivateRoute path="/home" >
            <Home></Home>
          </PrivateRoute>
          <Route path="/login" >
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
