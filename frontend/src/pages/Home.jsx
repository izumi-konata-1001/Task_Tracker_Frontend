import { useAuth } from "../context/AuthContext";

import Header from "../components/Header";
import GuestHome from "../components/guest/GuestHome";
import UserHome from "../components/user/UserHome";

function Home(){
    const {token} = useAuth();
    
    return(
        <div>
            <Header />
            <div class="flex justify-center w-full min-h-screen">
                <div class=" bg-light w-4/5">
                    {
                        token?<UserHome /> : <GuestHome />
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;