import { Link } from "react-router-dom"

function Navigation(){
    return(
        <div class="w-full h-full flex flex-row justify-end items-center space-x-2 text-xl font-semibold">
            <div class="w-1/2 pl-10 flex justify-start">
                <Link class="text-white hover:text-dark" to='/'>Home</Link>
            </div>
            <div class="w-1/2 pr-10 flex justify-end">
                <Link class="text-white hover:text-dark" to='/login'>Login</Link>
                <label class="text-white"> / </label>
                <Link class="text-white hover:text-dark" to='/register'>Register</Link>
            </div>

        </div>
    )
}

export default Navigation;