import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BASE_URL from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";

function Login(){

    const navigate = useNavigate();
    const {login} = useAuth();
    const [message,setMessage] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(name =="email")
            setEmail(value);
        else if(name =="password")
            setPassword(value);
    }

    const handleLogin = async (e)=>{
        e.preventDefault();

        setMessage("");

        if(!email || !password){
            setMessage('Please enter email and password.');
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/user/auth`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    email:email,
                    password:password,
                }),
            })

            const result = await response.json();
            if(response.ok){
                const token = result.token;
                login(token);
                setLoginMessage('Login successfully.');
                console.log('Login successfully.');
                navigate('/');
                return;
            }else if(response.status == 404){
                setMessage('User not found.');
                console.error('Login failed, error:', result.error);
                return;
            }else if(response.status == 400){
                setMessage('Wrong password.');
                console.error('Login failed, error:', result.error);
                return;
            }else{
                setMessage('Login failed.');
                console.error('Login failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Login failed, network or unexpected error.');
            console.error('Login failed, error:', error);
            return;
        }
    }

    return(
        <div className="w-full h-full flex flex-col">
            <Header />
            <div className="w-full flex-1 flex justify-center items-center py-10">
                <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <div className="text-center mb-3">
                        <h1 className="text-2xl font-bold">Login</h1>
                    </div>
                    <div className="w-full text-left flex">
                        <form onSubmit={handleLogin}
                        className="space-y-6 w-full">
                            <div className="w-full">
                                <div className="w-full flex justify-between">
                                    <label className="text-left text-sm font-medium">Email: </label>
                                </div>
                                <input name="email" value={email} onChange={handleChange}
                                className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required />
                            </div>

                            <div className="w-full">
                                <div className="w-full flex justify-between">
                                    <label className="text-left text-sm font-medium">Password: </label>
                                </div>
                                <input name="password" value={password} onChange={handleChange}
                                className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required />
                            </div>
                            <div className="w-full flex justify-center">
                                <button type="submit"
                                className="cursor-pointer w-full bg-primary text-white  border-primary border-2 hover:bg-white hover:text-primary  font-semibold px-6 py-2 rounded-md transition-colors duration-300">
                                    Login
                                </button>
                            </div> 
                        </form>
                    </div>
                    <div className="text-center">
                        {loginMessage ? (
                            <p className="text-sm text-green">{loginMessage}</p>
                        ):(
                            <p className="text-sm text-alter">{message}</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;