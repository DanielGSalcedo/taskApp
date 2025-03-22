import {useState} from "react";
import {client} from "../api/cliente";

function Login() {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           await client.auth.signInWithOtp({
                email: email
            });
        }catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Email</label>
                <input
                    type="email"
                    name=""
                    id=""
                    placeholder="youremail@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button>
                    send
                </button>
            </form>
        </div>
    );
}

export default Login;