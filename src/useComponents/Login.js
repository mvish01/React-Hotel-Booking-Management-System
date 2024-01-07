import { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";



function Login({ setIsUserLoggedIn }) {
    var [user, setUser] = useState({ email: "", password: "" });
    var history = useHistory();

    var TextChanged = function (args) {
        var copyOfUser = { ...user };
        copyOfUser[args.target.name] = args.target.value;
        setUser(copyOfUser);
    }


    var DoLogin = function () {

        const url = 'http://localhost:4004/user/login';
        const headers = {
            'Content-Type': 'application/json'
        };


        axios.post(url, user, { headers })
            .then(response => {
                // console.log( response.data.data[0]);                
                // console.log('User ID:', user.user_id);

                if (response.data.data.length > 0) {
                    sessionStorage.setItem("isUserLoggedIn", "true");
                    sessionStorage.setItem("username", user.email);
                    const userid = response.data.data[0];
                    sessionStorage.setItem("userid", userid.user_id);
                    window.location.href = '/home'
                }
                else { alert("WRONG CREDENTIALS") }

            })
            .catch(error => {
                console.error('Error:', error);


            });


    }




    return <>
        <center>
            <div className="table-responsive mt-5" style={{ width: 400 }}>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>User Name</td>
                            <td>
                                <input type="text"
                                    value={user.email}
                                    onChange={TextChanged}
                                    name="email"
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
                            <td colSpan={1}>
                                <button className="btn btn-primary"
                                    onClick={DoLogin}
                                >Sign In</button>
                            </td>
                            <td>
                                <Link to="/register">Register Here</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </center>
    </>

}
export default Login;
