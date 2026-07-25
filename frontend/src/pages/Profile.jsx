import { useEffect, useState } from "react";
import { getCurrentUser, updateUser } from "../services/userService";


function Profile() {


    const [profile, setProfile] = useState(null);

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");



    useEffect(() => {


        const fetchProfile = async () => {

            const data = await getCurrentUser();

            setProfile(data);

            setUsername(data.username);

            setEmail(data.email);

        };


        fetchProfile();


    }, []);





    const handleUpdate = async (e) => {

        e.preventDefault();


        const data = await updateUser({
            username,
            email
        });


        setProfile(data.user);

    };





    if (!profile) {

        return <p>Loading...</p>;

    }



    return (

        <div>

            <h1>
                Profile
            </h1>


            <form onSubmit={handleUpdate}>


                <input
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />


                <input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />


                <button>
                    Save
                </button>


            </form>


        </div>

    );

}


export default Profile;