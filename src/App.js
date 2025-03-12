import './App.css';
import {Route} from 'react-router-dom'
import {Routes} from "react-router";
import Login from "./pages/login";
import Home from "./pages/home";
import NotFound from "./pages/NotFound";

function App() {
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
