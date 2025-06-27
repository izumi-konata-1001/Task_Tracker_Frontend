import { Outlet,useLocation } from "react-router-dom";

import Header from "../../components/Header";
import SwitchButton from "../../components/user/pomodoro/SwitchButton";
function Pomodoro(){
    const location = useLocation();
    const hideSwitchButton = location.pathname.startsWith("/pomodoro/detail");
    return(
        <div>
            <Header />
            <div class="flex justify-center w-full min-h-screen">
                <div class=" bg-light w-4/5">
                <div class="w-full flex flex-col justify-center items-center">
                    <div class="w-full">
                        {!hideSwitchButton ? <SwitchButton /> : null}
                    </div>
                    <div class="w-full">
                         <Outlet />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Pomodoro;