import { useAuth } from "../context/AuthContext";

import Header from "../components/Header";
import GuestHome from "../components/guest/GuestHome";
import UserHome from "../components/user/home/UserHome";

function Home(){
    const {token} = useAuth();
    
    return(
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="w-full flex-1 pt-10 flex justify-center items-center">
                <div className="md:bg-light md:w-8/10 bg-light w-full h-full">
                    {
                        token? <UserHome /> : <GuestHome />
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;