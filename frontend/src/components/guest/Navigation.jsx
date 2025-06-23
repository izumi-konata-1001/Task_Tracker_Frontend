import { Link } from "react-router-dom"

function Navigation(){
    return(
        <div class="w-full h-full flex flex-row justify-end items-center space-x-2 pr-5 text-xl font-semibold
">
            <Link class="text-white hover:text-dark" to='/login'>Login</Link>
            <label class="text-white">/</label>
            <Link class="text-white hover:text-dark" to='/register'>Register</Link>
        </div>
    )
}

export default Navigation;