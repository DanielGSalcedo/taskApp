import './App.css';
import {useEffect} from "react";
import {Route,Routes,useNavigate} from 'react-router-dom'
import Login from "./pages/login";
import Home from "./pages/home";
import NotFound from "./pages/NotFound";
import {supabase} from "./supabase/cliente";

function App() {
    const navigate = useNavigate();
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
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
