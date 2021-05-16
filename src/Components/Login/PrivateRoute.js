import React, { useContext } from 'react';
import {
    Redirect, Route
} from "react-router-dom";
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser] = useContext(UserContext)


    let sessionUser = false;

    if (sessionStorage.getItem('email').indexOf('@')) {
        sessionUser = true
    }


    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.auth || sessionUser ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;