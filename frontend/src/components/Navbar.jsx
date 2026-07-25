import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Navbar.css";


function Navbar() {


    const { user, logout } = useAuth();



    return (

        <nav className="navbar">


            <div className="nav-logo">

                <Link to="/">
                    📖 BlogPro
                </Link>

            </div>




            <div className="nav-links">


                <Link to="/">
                    Home
                </Link>



                {
                    user && (

                        <Link to="/create-post">
                            Write
                        </Link>

                    )
                }




                {
                    user && (

                        <Link to="/profile">
                            Profile
                        </Link>

                    )
                }





                {
                    user ? (

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >

                            Logout

                        </button>


                    ) : (

                        <>

                            <Link to="/login">
                                Login
                            </Link>


                            <Link to="/Register">
                                Register
                            </Link>

                        </>

                    )
                }



            </div>


        </nav>

    );

}


export default Navbar;