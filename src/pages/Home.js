import React, {useEffect} from 'react';
import {client} from "../api/cliente";
import {useNavigate} from "react-router-dom";
import TaskForm from "../components/taskform";
import TaskList from "../components/TaskList.js";

function Home() {
    const navigate = useNavigate();

    useEffect(()=>{
        if(!client.auth.getUser()){
            navigate("/login");
        }
    },[navigate])
    return (
        <div>Home
            <button onClick={()=>client.auth.signOut()}>
                log out
            </button>
            <TaskForm/>
            <TaskList/>
        </div>
    );
}

export default Home;