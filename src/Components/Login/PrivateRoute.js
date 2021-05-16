import React, { useContext } from 'react';
import {
    Redirect, Route
} from "react-router-dom";
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser] = useContext(UserContext)
    const sessionUser = sessionStorage.getItem('email')

    console.log(sessionUser);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.auth ? (
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