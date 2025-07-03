import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoMenu } from "react-icons/io5";

function Navigation() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = ()=>{
    setIsOpen((prev)=>{
      return !prev;
    })
  }
  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <div className="w-full text-white bg-primary">
      <div className={`h-10 px-4 w-full flex justify-center items-center ${isOpen ? "shadow-sm" : ""} `}>
        <div className="w-1/2 flex flex-row justify-start items-center">
          <label className="text-left md:text-3xl md:font-semibold text-xl font-bold">Task Tracker</label>
        </div>

        <div className="cursor-pointer w-1/2 flex flex-row justify-end items-center text-3xl font-bold">
          <IoMenu onClick={handleOpen} className="cursor-pointer hover:text-dark"/>
        </div>
      </div>

      <div
        className={` transition-all duration-800 ease-in-out overflow-hidden ${
          isOpen ? "max-h-80 opacity-100 " : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col justify-center items-end gap-4 px-4 py-3 text-xl font-bold">
          <Link to="/" onClick={handleOpen} className="hover:text-dark">
            Home
          </Link>
          <Link to="/task" onClick={handleOpen} className="hover:text-dark">
            Tasks
          </Link>
          <Link to="/issue" onClick={handleOpen} className="hover:text-dark">
            Issues
          </Link>
          <Link to="/pomodoro" onClick={handleOpen} className="hover:text-dark">
            Pomodoro
          </Link>
          <Link to="/account" onClick={handleOpen} className="hover:text-dark">
            Account
          </Link>
          <button
            onClick={() => {
              handleLogout();
              handleOpen
            }}
            className="cursor-pointer text-left hover:text-alter"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;