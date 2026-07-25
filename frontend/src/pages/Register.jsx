import { useState } from "react";
import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext";


function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginUser } = useAuth();


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const data = await register({
                username,
                email,
                password
            });


            loginUser(
                data.user,
                data.token
            );


            console.log("Registered successfully");


        } catch(error) {

            console.error(error.response.data);

        }

    };


    return (

        <div>

            <h1>
                Register
            </h1>


            <form onSubmit={handleSubmit}>


                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />


                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />


                <button type="submit">
                    Register
                </button>


            </form>

        </div>

    );
}


export default Register;