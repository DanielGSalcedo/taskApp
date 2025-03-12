import React from 'react';
import {useState} from "react";
import {client} from '../supabase/cliente.js';

function Login() {

    const [email, setEmail] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
           await client.auth.signInWithOtp({email,options:
           {emailRedirectTo: 'http://localhost:3000'}});
        }catch (e) {
            console.error(e);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="">type your email</label>
                <input type="email" name="" id="" placeholder="youremailhere@site.com"
                    onChange={(event)=> setEmail(event.target.value)}
                />
                    <button>send</button>
            </form>
        </div>
    );
}

export default Login;