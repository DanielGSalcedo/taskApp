import React, {useEffect} from 'react';
import {client} from "../api/cliente";
import {useNavigate} from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList.js";

function Home() {
    const navigate = useNavigate();

    useEffect(()=>{
        const validateSession = async () => {
            try {
                const user = (await client.auth.getUser()).data.user;
                if(!user){
                    navigate("/login");
                }
            } catch (error) {
                console.error(error);
                navigate("/login");
            }
        };
        validateSession();
    },[navigate])
    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Task Organizer</h1>
                <button className="button button-secondary" onClick={()=>client.auth.signOut()}>
                    Cerrar sesión
                </button>
            </header>
            <TaskForm/>
            <TaskList/>
        </div>
    );
}

export default Home;
