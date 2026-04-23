import './styles/app.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import NotFound from "./pages/NotFound";
import {useEffect} from "react";
import {client} from "./api/cliente";
import {TaskContextProvider} from "./context/TaskContext";

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        const {data: {subscription}} = client.auth.onAuthStateChange((event,session)=>{
            if(!session){
                navigate("/login");
            }
            else{
                navigate("/");
            }
        });
        return () => subscription?.unsubscribe?.();
    },[navigate])
  return (
    <div className="app-shell">
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
