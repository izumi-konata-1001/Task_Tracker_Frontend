import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PleaseLogin(){
    const navigate = useNavigate();
    const [second, setSecond] = useState(5);

    useEffect(()=>{
        const countdown = setInterval(()=>{
            setSecond((prev)=> prev - 1);
        },1000);

        const timer = setTimeout(()=>{
            navigate("/");
        },5000);

        return () => {
        clearInterval(countdown);
        clearTimeout(timer);
        };
    },[navigate]);

    return(
        <div class="w-full h-full flex flex-col">
            <div class="w-full flex-1 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md text-center">
                    <p className="text-lg mb-2">Please login</p>
                    <p className="text-sm text-gray-500">
                        Redirecting in {second} seconds...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PleaseLogin;