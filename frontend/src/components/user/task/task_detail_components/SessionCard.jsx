import { RiDeleteBin5Line } from "react-icons/ri";

import { useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import BASE_URL from "../../../../utils/api";

function SessionCard(props){
    const session = props.session;
    const fetchTaskDetail = props.fetchTaskDetail;
    const setSessionMessage = props.setSessionMessage
    const {token} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    function formatDate(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const hour = `${date.getHours()}`.padStart(2, '0');
        const minute = `${date.getMinutes()}`.padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    const handleSession = (sessionId)=>{
        navigate(`/pomodoro/detail/${sessionId}`,{state: { from: location.pathname }})
    }
    
    const handleDelete =async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/pomodoro/delete`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`,
                },
                body:JSON.stringify({
                    sessionId:session.id,
                }),
            });
            const result = await response.json();
            if(response.ok){
                console.log('Delete session successfully.');
                await fetchTaskDetail();
                return;
            }
            else{
                setSessionMessage('Delete session failed.');
                console.error('Delete session failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Delete session failed, network or unexpected error.')
            console.error('Delete session failed, error:', error);
            return;
        }
    }
    return(
        <div className="w-full flex flex-row">
            <div onClick={()=>handleSession(session.id)}
            className="cursor-pointer w-9/10 flex flex-row justify-center items-center px-4 py-2 bg-white border-2 border-dark rounded-md 
            hover:border-primary hover:border-3 transition-colors duration-300"
            >
                <div className="w-3/5 felx flex-col justify-start">
                    <div className="w-full sm:flex sm:flex-row flex flex-col">
                        <label className="text-black text-base">Note: </label>
                        {session.note ? (
                            <label className="sm:pl-5 text-dark">{session.note}</label>
                        ):(
                            <label className="sm:pl-5 text-shadow text-base">null</label>
                        )}
                    </div>
                    <div className="w-full sm:flex sm:flex-row flex flex-col">
                        <label className="text-black text-base">Started at:</label>
                        <label className="sm:pl-5 text-green">{formatDate(session.start_time)}</label>
                    </div>
                    <div className="w-full sm:flex sm:flex-row flex flex-col">
                        <label className="text-black text-base">Ended at:</label>
                        <label className="sm:pl-5 text-primary">{formatDate(session.estimated_end_time)}</label>
                    </div>
                </div>

                <div className="w-2/5 flex flex-col justify-center items-end">
                    <label className="text-black text-base">Druation: </label>
                    <label className=" text-primary text-base font-bold">{session.duration_minutes} mins</label>
                </div>
            </div>
            <div className="w-1/10 pl-2">
                <button type="button" onClick={handleDelete}
                        className="cursor-pointer w-full h-full  rounded-xl bg-alter text-white border-2 border-alter
                        hover:bg-white hover:text-alter 
                        font-medium transition-colors duration-300
                        flex items-center justify-center">
                    <RiDeleteBin5Line className="text-2xl"/>
                </button>
            </div>
        </div>
    )
}

export default SessionCard;
