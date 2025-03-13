import React, {useEffect} from 'react';
import {useState} from "react";
import {supabase} from '../supabase/cliente.js';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await supabase.auth.signInWithOtp({
                email,
            });
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session)=> {
            if (!session) {
                navigate("/login");
            }else if (session){
                navigate("/");
            }
        })
    }, []);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">type your email</label>
                <input type="email" name="" id="" placeholder="youremailhere@site.com"
                       onChange={(event) => setEmail(event.target.value)}
                />
                <button>send</button>
            </form>
        </div>
    );
}

export default Login;