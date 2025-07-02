import { useState } from "react";
import { useLocation } from "react-router-dom";

import BASE_URL from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

import BackButton from "../../BackButton";
import RedirectAfter from "../../RedirectAfter";

function ChangePasword(){
    const location = useLocation();
    const from = location.state?.from;
    const {token, updateToken} = useAuth();

    const [showRedirect, setShowRedirect] = useState(false);

    const [message, setMessage] = useState("");
    const [oldPasswordMessage, setOldPasswordMessage] = useState("");
    const [newPasswordMessage, setNewPasswordMessage] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(name == "oldPassword")
            setOldPassword(value);
        else if(name == "newPassword")
            setNewPassword(value);
        else if(name == "confirmPassword")
            setConfirmPassword(value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        setMessage("");
        setOldPasswordMessage("");
        setNewPasswordMessage("");

        if(!oldPassword|| !newPassword || !confirmPassword){
            setMessage("Old password, new password, and confirmation cannot be empty.");
            return;
        }
        if(newPassword !== confirmPassword){
            setNewPasswordMessage('Confirmation do not match.');
            return;
        }

        try{
            const response = await fetch(`${BASE_URL}/user/change_password`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword:newPassword,
                }),
            })

            const result = await response.json();
            if(response.ok){
                const newToken = result.token;
                updateToken(newToken);
                setMessage('Change password successfully.');
                console.log('Change password successfully.');
                setShowRedirect(true);
                return;
            }
            else if(response.status == 400){
                setOldPasswordMessage(result.error);
                console.error('Change password failed, error:', result.error);
                return;
            }
            else{
                setMessage('Change password failed.');
                console.error('Change password failed, error:', result.error);
                return;
            }
        }catch(error){
                setMessage('Change password failed, network or unexpected error');
                console.error('Change password failed, error:', error);
                return;
        }
    }

    return(
        <div>
            <div className="mb-4">
                <BackButton path={from} />
            </div>
            
            <div className="text-center mb-3">
                <h1 className="text-2xl font-bold">Change Password</h1>
            </div>
            <div className="w-full text-left flex">
                <form onSubmit={handleSubmit}
                className="space-y-6 w-full">
                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <label className="text-left text-sm font-medium">Old Password: </label>
                            <label className="text-right text-sm text-alter">{oldPasswordMessage}</label>
                        </div>
                        <input name="oldPassword" value={oldPassword} onChange={handleChange}
                        className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required />
                    </div>

                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <label className="text-left text-sm font-medium">New Password: </label>
                            <label className="text-right text-sm text-alter">{newPasswordMessage}</label>
                        </div>
                        <input name="newPassword" value={newPassword} onChange={handleChange}
                        className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required />
                    </div>

                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <label className="text-left text-sm font-medium">Confirm New Password: </label>
                        </div>
                        <input name="confirmPassword" value={confirmPassword} onChange={handleChange}
                        className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required />
                    </div>
                    <div className="w-full flex justify-center">
                        <button type="submit"
                        className="w-full bg-primary text-white  border-primary border-2 hover:bg-white hover:text-primary  font-semibold px-6 py-2 rounded-md transition-colors duration-300">
                            Submit
                        </button>
                    </div> 
                </form>
            </div>
            <div className="text-center">
                <p className="text-sm text-alter">{message}</p>
            </div>
            <RedirectAfter visible={showRedirect} delay={3000} path="/account" message="Redirecting..." />
        </div>

    )
}

export default ChangePasword;