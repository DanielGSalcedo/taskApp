import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from './pages/login.js';
import Home from './pages/Home.js';
import NotFound from "./pages/NotFound";
import {useEffect} from "react";
import {client} from "./api/cliente";
import {TaskContextProvider} from "./context/TaskContext";

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        client.auth.onAuthStateChange((event,session)=>{
            if(!session){
                navigate("/login");
            }
            else{
                navigate("/");
            }
        })
    },[navigate])
  return (
    <div className="App">
        <TaskContextProvider>
            <Routes>

                <Route  path="/" element={<Home/>}/>
                <Route  path="/login" element={<Login/>}/>
                <Route  path="*" element={<NotFound/>}/>
            </Routes>
        </TaskContextProvider>
    </div>
  );
}

export default App;
