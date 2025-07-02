import { Outlet } from "react-router-dom";

import Header from "../../components/Header";

function Task(){
    return(
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="w-full flex-1 pt-10 flex justify-center items-center">
                <div className="md:bg-light md:w-8/10 bg-light w-full h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Task;