import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginUser } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const data = await login({
                email,
                password
            });


            loginUser(data.user, data.token);


            console.log("Logged in");


        } catch(error) {

            console.error(error.response.data);

        }
    };


    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

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


                <button>
                    Login
                </button>

            </form>

        </div>
    );
}


export default Login;