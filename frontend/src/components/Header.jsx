import UserNavigation from './user/Navigation'
import GuestNavigation from './guest/Navigation';

import { useAuth } from '../context/AuthContext';
function Header(){
    const {token} = useAuth();
    return(
        <div class="flex bg-primary text-black h-10 items-center">
            <div class="h-full w-full">
                { 
                    token ? <UserNavigation /> : <GuestNavigation /> 
                }
            </div>
        </div>
    )
}

export default Header;