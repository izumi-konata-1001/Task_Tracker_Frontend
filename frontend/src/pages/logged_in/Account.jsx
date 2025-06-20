import { Outlet } from "react-router-dom";

import Header from "../../components/Header";

function Account(){
    return(
        <div class="w-full h-full flex flex-col">
            <Header />
            <div class="w-full flex-1 flex justify-center items-center">
                <div class="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <Outlet />
                </div> 
            </div>
        </div>
    )
}

export default Account;