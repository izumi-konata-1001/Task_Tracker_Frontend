import { Outlet } from "react-router-dom";

import Header from "../../components/Header";

function Account(){
    return(
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="w-full flex-1 py-20 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <Outlet />
                </div> 
            </div>
        </div>
    )
}

export default Account; 