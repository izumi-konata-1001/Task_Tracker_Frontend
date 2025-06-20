import { Link } from "react-router-dom";

function Navigation(){
    return(
        <div className="h-full flex justify-center items-center">
            <div className="h-full flex-1 flex items-center justify-center transition duration-300 hover:bg-white rounded">
                <Link to="/account" className="w-full text-center">Account</Link>
            </div>
            <div className="h-full flex-1 flex items-center justify-center transition duration-300 hover:bg-white rounded">
                <Link to="/task" className="w-full text-center">Tasks</Link>
            </div>
            <div className="h-full flex-1 flex items-center justify-center transition duration-300 hover:bg-white rounded">
                <Link to="/issue" className="w-full text-center">Issues</Link>
            </div>
        </div>
    )
}

export default Navigation;