import {supabase} from "../supabase/cliente";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(supabase.auth.getUser());
        supabase.auth.onAuthStateChange((event, session) => {
            if(session){
                navigate("/");
            }else if (!session){
                navigate("/login");
            }
        })
    })
    return (
        <div>
            <h1>Home</h1>
            <button onClick={()=>supabase.auth.signOut()}>log out</button>
        </div>
    );
}

export default Home;
