import { useState } from "react";
import BASE_URL from "../../utils/api";

import Header from "../../components/Header";
import RedirectAfter from "../../components/RedirectAfter";
function Register(){
    
    const [showRedirect, setShowRedirect] = useState(false);

    const [message, setMessage] = useState("");
    const [registerMessage,setRegisterMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    
    const handleChange = (e)=>{
        const {name, value} = e.target;

        if(name == "email")
            setEmail(value);
        else if(name =="username")
            setUsername(value);
        else if(name == "password")
            setPassword(value);
        else if(name == "confirmPassword")
            setConfirmPassword(value);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        setMessage("");
        setRegisterMessage("");
        setEmailMessage("");
        setUsernameMessage("");
        setPasswordMessage("")

        if(!email || !username || !password || !confirmPassword){
            setMessage("Please fill the from.");
            return;
        }
        if(password != confirmPassword){
            setPasswordMessage("Confirm password is not matched.");
            return;
        }
        if(!isValidEmail(email)){
            setEmailMessage("Email is not valid.");
            return;
        }

        try{
            const response = await fetch(`${BASE_URL}/user/create`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    email:email,
                    username:username,
                    password:password,
                }),
            });

            const result = await response.json();
            if(response.ok){
                setRegisterMessage('Registered successfully.');
                console.log('Registered successfully, token:', result.token);
                setShowRedirect(true);
                return;
            }else if(response.status == 409){
                setMessage(result.error);
                console.log('Registered failed, error:', result.error);
                return;
            }else{
                setMessage('Registered failed.');
                console.error('Registered failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Registered failed, network or unexpected error.');
            console.error('Registered failed, error:', error);
            return;
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return(
        <div className="w-full h-full flex flex-col">
            <Header />
            <div 
            className="w-full flex-1 flex py-20 justify-center items-center">
                <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <div className="text-center mb-3">
                        <h1 className="text-2xl font-bold">Register</h1>
                    </div>
                    <div className="w-full text-left flex">
                        <form onSubmit={handleSubmit}
                        className="space-y-6 w-full">
                            <div className="w-full">
                                <div className="w-full flex justify-between">
                                    <label className="text-left text-sm font-medium">Email: </label>
                                    <label className="text-right text-sm text-alter">{emailMessage}</label>
                                </div>
                                <input name="email" value={email} onChange={handleChange}
                                className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required />
                            </div>

                            <div className="w-full">
                                <div className="w-full flex justify-between">
                                    <label className="text-left text-sm font-medium">Username: </label>
                                    <label className="text-right text-sm text-alter">{usernameMessage}</label>
                                </div>
                                <input name="username" value={username} onChange={handleChange}
                                className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required />
                            </div>

                            <div className="w-full">
                                <div className="w-full flex justify-between">
                                    <label className="text-left text-sm font-medium">Password: </label>
                                    <label className="text-right text-sm text-alter">{passwordMessage}</label>
                                </div>
                                <input name="password" value={password} onChange={handleChange}
                                className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required />
                            </div>

                            <div className="w-full">
                                <div className="w-full flex">
                                    <label className="text-left text-sm font-medium">Confirm Password: </label>
                                </div>
                                <input name="confirmPassword" value={confirmPassword} onChange={handleChange}
                                className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required />
                            </div>

                            <div className="w-full flex justify-center">
                                <button type="submit"
                                className="cursor-pointer w-full bg-primary text-white  border-primary border-2 hover:bg-white hover:text-primary  font-semibold px-6 py-2 rounded-md transition-colors duration-300">
                                    Register
                                </button>
                            </div> 
                        </form>
                    </div>
                    <div className="text-center pt-4">
                        {registerMessage ? (
                            <p className="text-sm text-green">{registerMessage}</p>
                        ):(
                            <p className="text-sm text-alter">{message}</p>
                        )}
                    </div>
                </div>
            </div>
            <RedirectAfter visible={showRedirect} delay={3000} path="/login" message="Redirecting..." />
        </div>
    )
}

export default Register;