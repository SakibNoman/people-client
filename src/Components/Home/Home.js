import React, { useEffect, useState } from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { notifications } from '../../App';

const Home = () => {

    //form handling hook
    const { register, handleSubmit, formState: { errors } } = useForm();

    //state hook to store people data
    const [peoples, setPeoples] = useState([]) || []

    //fetch api to add new people
    const onSubmit = data => {
        fetch('https://tranquil-tor-30729.herokuapp.com/addPeople', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => notifications('Wow!', 'Inserted Successfully', 'success', 500))
    }

    //useEffect hook and fetch api to find all peoples
    useEffect(() => {
        fetch('https://tranquil-tor-30729.herokuapp.com/peoples', {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => setPeoples(data))
    }, [peoples, setPeoples])


    const handleDelete = (id) => {
        fetch(`https://tranquil-tor-30729.herokuapp.com/deletePeople/${id}`, {
            method: 'DELETE',
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
    }

    return (
        <div className="mt-5 mx-auto w-50 shadow p-3 rounded" >
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Add People">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input className="form-control mt-2" placeholder="username" {...register("username", { required: true, pattern: { value: /^[A-Za-z0-9]+$/i } })} />

                        {errors.username?.type === "required" && <span className="text-danger" >This field is required</span>}

                        {errors.username?.type === "pattern" && <span className="text-danger" >This field is not valid</span>}

                        <input className="form-control mt-3" placeholder="mobile no." {...register("mobile", { required: true, pattern: { value: /^\d{10}$/ } })} />

                        {errors.mobile?.type === "required" && <span className="text-danger" >This field is required</span>}

                        {errors.mobile?.type === "pattern" && <span className="text-danger" >This field is not valid</span>}

                        <input className="form-control mt-3" placeholder="email" {...register("email", { required: true, pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ } })} />

                        {errors.email?.type === "required" && <span className="text-danger" >This field is required</span>}

                        {errors.email?.type === "pattern" && <span className="text-danger" >This field is not valid</span>}

                        <input className="form-control mt-3" placeholder="address" {...register("address", { required: true })} />

                        {errors.address && <span className="text-danger" >This field is required</span>}

                        <input className="form-control mt-3 btn-success" type="submit" value="Add" />
                    </form>
                </Tab>
                <Tab eventKey="profile" title="Peoples">
                    <Table>
                        <thead>
                            <tr className="text-center" ><th>username</th><th>email</th><th>mobile</th><th>address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                            {peoples.map(each => <tr key={each._id} ><td>{each.username}</td><td>{each.email}</td><td>{each.mobile}</td><td>{each.address}</td> <td> <button className="btn btn-danger" onClick={() => handleDelete(`${each._id}`)} >Delete</button></td></tr>)}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </div>
    );
};

export default Home;