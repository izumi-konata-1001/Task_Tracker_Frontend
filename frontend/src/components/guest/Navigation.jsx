import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

function Navigation() {
  
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = ()=>{
    setIsOpen((prev)=>{
    return !prev
    })
  }

  return (
    <div className="w-full text-white bg-primary">
      <div className={`h-10 px-4 w-full flex justify-center items-center ${isOpen ? "shadow-sm" : ""} `}>
        <div className="w-1/2 flex flex-row justify-start items-center">
          <label className="text-left md:text-3xl md:font-semibold text-xl font-bold">Task Tracker</label>
        </div>

        <div className="cursor-pointer w-1/2 flex flex-row justify-end items-center text-3xl font-bold">
          <IoMenu onClick={handleOpen}  className="cursor-pointer"/>
        </div>
      </div>

      <div
        className={`transition-all duration-800 ease-in-out overflow-hidden ${
          isOpen ? "max-h-80 opacity-100 " : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col justify-center items-end gap-4 px-4 py-3 text-xl font-bold">
          <Link to="/"onClick={handleOpen} className="hover:text-dark">
            Home
          </Link>
          <Link to="/login" onClick={handleOpen} className="hover:text-dark">
            Login
          </Link>
          <Link to="/register" onClick={handleOpen} className="hover:text-dark">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;