import React, { useEffect, useState } from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [peoples, setPeoples] = useState([])


    const onSubmit = data => {
        fetch('http://localhost:5000/addPeople', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                alert("People added successfully")
            })
    }

    useEffect(() => {
        fetch('http://localhost:5000/peoples')
            .then(res => res.json())
            .then(data => setPeoples(data))
    }, [peoples])

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/deletePeople/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err))
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