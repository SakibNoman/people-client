import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { notifications, UserContext } from '../../App';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    sessionStorage.setItem('email', loggedInUser.email)
    let history = useHistory();
    let { from } = { from: { pathname: "/home" } };

    const onSubmit = data => {

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.auth) {
                    notifications('Hou!', 'Login Success!', 'success', 200)
                    setLoggedInUser({ auth: data.auth, email: data.email })
                    localStorage.setItem('token', data.token)
                    history.replace(from);
                }
                else {
                    notifications('Oops!', 'Login failed!', 'danger', 1000)
                }


            })
    };

    return (
        <div className="mt-5 mx-auto w-50 shadow p-3 rounded" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="form-control mt-3" type="email" placeholder="email" {...register("email", { required: true })} />
                {errors.email && <span className="text-danger" >Email is required</span>}
                <input className="form-control mt-3" type="password" placeholder="password" {...register("password", { required: true })} />
                {errors.password && <span className="text-danger" >Password is required</span>}
                <input className="form-control mt-3 btn-success" type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;