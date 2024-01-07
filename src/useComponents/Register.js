import axios from 'axios';
import React from 'react'
import { useHistory } from "react-router-dom";
import { useState } from "react";


function Register() {

    var [user, setUser] = useState({ firstname: "", lastname: "", email: "", phonenumber: "", password: "" });
    var history = useHistory();

    var TextChanged = function (args) {
        var copyOfUser = { ...user };
        copyOfUser[args.target.name] = args.target.value;
        setUser(copyOfUser);
    }

    var DoRegister = function () {

        const url = 'http://localhost:4004/user/register';
        const headers = {
            'Content-Type': 'application/json'
        };


        axios.post(url, user, { headers })
            .then(response => {
                console.log('Response:', response.data);
                history.replace("/login");
            })
            .catch(error => {
                console.error('Error:', error);

            });


    }

    return (
        <center>
            <div className="table-responsive mt-5" style={{ width: 400 }}>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>FirstName</td>
                            <td>
                                <input type="text"
                                    value={user.firstname}
                                    onChange={TextChanged}
                                    name="firstname"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>LastName</td>
                            <td>
                                <input type="text"
                                    value={user.lastname}
                                    onChange={TextChanged}
                                    name="lastname"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>
                                <input type="text"
                                    value={user.email}
                                    onChange={TextChanged}
                                    name="email"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>PhoneNumber</td>
                            <td>
                                <input type="text"
                                    value={user.phonenumber}
                                    onChange={TextChanged}
                                    name="phonenumber"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Password</td>
                            <td>
                                <input type="password"
                                    value={user.password}
                                    onChange={TextChanged}
                                    name="password"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2}>
                                <button className="btn btn-primary"
                                    onClick={DoRegister}
                                >Register</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </center>
    )
}

export default Register
