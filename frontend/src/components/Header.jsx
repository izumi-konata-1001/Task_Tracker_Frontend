import UserNavigation from './user/Navigation'
import GuestNavigation from './guest/Navigation';

import { useAuth } from '../context/AuthContext';
function Header(){
    const {token} = useAuth();
    return(
        <div class="flex bg-primary text-black h-10 items-center">
            <div class="h-full w-1/6 flex items-center">
                <label class="pl-10">Task Tracker.co</label>
            </div>
            <div class="h-full w-5/6">
                { 
                    token ? <UserNavigation /> : <GuestNavigation /> 
                }
            </div>
        </div>
    )
}

export default Header;