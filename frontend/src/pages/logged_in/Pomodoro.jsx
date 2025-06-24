import { Outlet } from "react-router-dom";

import Header from "../../components/Header";
import SwitchButton from "../../components/user/pomodoro/SwitchButton";
function Pomodoro(){
    return(
        <div>
            <Header />
            <div class="flex justify-center w-full min-h-screen">
                <div class=" bg-light w-4/5">
                    <SwitchButton />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Pomodoro;