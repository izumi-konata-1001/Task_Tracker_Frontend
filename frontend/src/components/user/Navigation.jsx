import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navigation(){
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout =()=>{
        navigate('/');
        logout();
    }
    return(
        <div className="h-full flex justify-center items-center text-white  text-xl font-semibold">
            <div className="h-full flex-1 flex items-center justify-center transition duration-300 hover:text-dark rounded">
                <Link to="/" className="w-full text-center">Home</Link>
            </div>
            <div className="h-full flex-1 flex items-center justify-center transition duration-300 hover:text-dark rounded">
                <Link to="/account" className="w-full text-center">Account</Link>
            </div>
            <div className="h-full flex-1 flex items-center justify-center transition duration-300 hover:text-dark rounded">
                <Link to="/task" className="w-full text-center">Tasks</Link>
            </div>
            <div className="h-full flex-1 flex items-center justify-center transition duration-300 hover:text-dark rounded">
                <Link to="/issue" className="w-full text-center">Issues</Link>
            </div>
            <div className="h-full flex-1 flex items-center justify-center transition duration-300 hover:text-dark rounded">
                <Link to="/pomodoro" className="w-full text-center">Pomodoro</Link>
            </div>
            <div class="cursor-pointer w-1/6 text-right hover:text-dark">
                <label onClick={handleLogout} class="cursor-pointer pr-10">Logout</label>
            </div>
        </div>
    )
}

export default Navigation;