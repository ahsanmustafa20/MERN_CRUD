import React from "react";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const navigate = useNavigate();

    const Submit =(e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/create", { name, email, age })
            .then(response => {
                console.log(response.data)
                navigate("/")
            })
            .catch(error => {
                console.error(error);
            });
    }

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" placeholder="Enter Name" 
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" placeholder="Enter Email" 
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="age">Age</label>
                        <input type="number" className="form-control" placeholder="Enter Age" 
                        onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <button className="btn btn-success mt-2">Submit</button>
                </form>
            </div>            
        </div>
    )
}

export default CreateUser;