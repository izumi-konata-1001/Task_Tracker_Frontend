import UserNavigation from './user/Navigation'
function Header(){
    return(
        <div class="flex bg-primary text-black h-10 items-center">
            <div class="h-full w-1/6 flex items-center">
                <label class="pl-10">Task Tracker.co</label>
            </div>
            <div class="h-full w-4/6">
                <UserNavigation />
            </div>
            <div class="w-1/6 text-right">
                <label class="pr-10">Logout</label>
            </div>
        </div>
    )
}

export default Header;