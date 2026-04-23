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
        <div className="page-container auth-page">
            <form className="panel auth-form" onSubmit={handleSubmit}>
                <h1>Task Organizer</h1>
                <p>Ingresa tu correo para recibir un enlace de acceso.</p>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="youremail@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="button button-primary">
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default Login;
