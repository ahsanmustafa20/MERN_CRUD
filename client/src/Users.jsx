import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("https://mern-crud-server-kts5.onrender.com")
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        console.log("Deleting:", id);

        axios.delete(`https://mern-crud-server-kts5.onrender.com/delete/${id}`)
            .then(() => {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
            })
            .catch((err) => {
                console.log(err?.response?.data || err.message);
            });
    }

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">Add +</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                               return <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className="btn btn-success">Edit</Link>
                                        <button type="button" className="btn btn-danger" 
                                        onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;