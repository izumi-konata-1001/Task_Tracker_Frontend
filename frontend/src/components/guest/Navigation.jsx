import { Link } from "react-router-dom"

function Navigation(){
    return(
        <div class="flex justify-end">
            <Link to='/login'>Login</Link>
            <label>/</label>
            <Link to='/register'>Register</Link>
        </div>
    )
}

export default Navigation;