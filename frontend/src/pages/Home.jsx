import { Outlet } from "react-router-dom";

import Header from "../components/Header";

function Home(){
    return(
        <div>
            <Header />
            <div class="flex justify-center w-full min-h-screen">
                <div class=" bg-light w-4/5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Home;