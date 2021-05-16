import React from 'react';
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className="mt-5 mx-auto w-50 shadow p-3 rounded" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="form-control mt-3" type="email" placeholder="email" {...register("example", { required: true })} />
                {errors.example && <span className="text-danger" >Email is required</span>}
                <input className="form-control mt-3" type="password" placeholder="password" {...register("exampleRequired", { required: true })} />
                {errors.exampleRequired && <span className="text-danger" >Password is required</span>}
                <input className="form-control mt-3 btn-success" type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;