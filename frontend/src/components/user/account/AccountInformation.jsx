import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import BASE_URL from "../../../utils/api";

import { useAuth } from "../../../context/AuthContext";

function AccountInformation(){
    const {token} = useAuth();
    const [userId, setUserId] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleChangePassword = ()=>{
        navigate('/account/change_password',{state: { from: location.pathname }});
    }

    const fetchUserInfo = async ()=>{
        console.log("token:", token);
        try{
            const response = await fetch(`${BASE_URL}/user/info`,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
            })

            const result = await response.json();

            if(response.ok){
                const user = result.user;
                setEmail(user.email);
                setUsername(user.username);
                setUserId(user.id);
                console.log("Fetch account data successfully.");
                return;
            }
            else if(response.status == 404){
                setMessage('User not found.');
                console.error('Fetch account data failed, error:', result.error);
                return;
            }
            else{
                setMessage('Fetch account data failed.');
                console.error('Fetch accont data failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch account data failed, network or unexpected error.');
            console.error('Fetch account data failed, error:', error);
            return;
        }
    }

    useEffect(() =>{
        const fetchData = async ()=>{
            await fetchUserInfo();
        }

        fetchData();
    },[token]);


    return(
        <div class="w-full">
            <div class="text-center mb-3">
                <h1 class="text-2xl font-bold">My Account</h1>
            </div>
            <div class="w-full space-y-4 text-base text-black flex flex-col px-20">
                <div class="flex justify-between items-center pb-1 ">
                    <label class="font-medium pr-5">User ID:</label>
                    <label class="text-shadoe">{userId}</label>
                </div>
                <div class="flex justify-between  items-center pb-1">
                    <label class="font-medium pr-2">Email:</label>
                    <label class="text-shadoe">{email}</label>
                </div>

                <div class="flex justify-between  items-center pb-1">
                    <label class="font-medium pr-2">Username: </label>
                    <label class="text-shadoe">{username}</label>
                </div>
            </div>
            <div class="flex justify-center w-full mt-3">
                <button type="button" onClick={handleChangePassword}
                class="w-full bg-primary text-white  border-primary border-2 hover:bg-white hover:text-primary  font-semibold px-6 py-2 rounded-md transition-colors duration-300">
                    Change Password
                </button>
            </div>
        </div>
    )
}

export default AccountInformation;