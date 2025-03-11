import React from 'react';
import {useState} from "react";

function Login() {

    const [email, setEmail] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
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