import { Outlet,useLocation } from "react-router-dom";

import Header from "../../components/Header";
import SwitchButton from "../../components/user/pomodoro/SwitchButton";
function Pomodoro(){
    const location = useLocation();
    const hideSwitchButton = location.pathname.startsWith("/pomodoro/detail");
    return(
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="w-full flex-1 pt-10 flex justify-center items-center">
                <div className="md:bg-light md:w-8/10 bg-light w-full h-full">
                    <div className="w-full flex flex-col space-y-5 justify-center items-center">
                        <div className="w-full">
                            {!hideSwitchButton ? <SwitchButton /> : null}
                        </div>
                        <div className="w-full">
                            <Outlet />
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Pomodoro;