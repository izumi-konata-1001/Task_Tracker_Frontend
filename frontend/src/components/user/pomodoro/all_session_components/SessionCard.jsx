import { FaArrowRight } from "react-icons/fa";
import { useNavigate,useLocation } from "react-router-dom";

function SessionCard(props){
    const session = props.session;

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
    
    const handleDetail = (e)=>{
        e.preventDefault();
        navigate(`/pomodoro/detail/${session.id}`,{state: { from: location.pathname }});
    }

    return(
        <div onClick={handleDetail}
        className="cursor-pointer w-full bg-white sm:bg-white flex sm:flex-row sm:space-x-3 flex-col px-6 py-5 sm:justify-center sm:items-center space-y-3 justify-start  border-2 border-dark rounded-xl
        hover:border-3 hover:border-primary">
            <div className="sm:w-8/10 flex flex-col justify-center items-center space-y-1">
                <div className="w-full flex justify-start items-center">
                    <p className="text-black text-xl sm:text-2xl font-bold sm:line-clamp-1 line-clamp-2">{session.task.title}</p>
                </div>
                <div className="w-full flex justify-start items-center">
                    <p className="text-base sm:line-clamp-1 line-clamp-2">
                        <label className="text-black">Session Note: </label> 
                        {session.note ? (
                            <label className="text-shadow">{session.note}</label>
                        ):  <label className="text-shadow">null</label>}
                    </p>
                </div>
                <div className="w-full flex justify-start items-center">
                    <p>
                        <label className="text-base text-black">Duration: </label>
                        <label className="text-base font-bold text-primary">{session.duration_minutes} mins</label>
                    </p>
                </div>
                <div className="w-full flex flex-col justify-start">
                    <div className="w-full flex flex-row space-x-1 sm:space-x-3 sm:items-center">
                        <label className="text-black">Start at: </label> 
                        <label className="text-green">{formatDate(session.start_time)}</label>
                    </div>
                    <div className="w-full flex flex-row space-x-1 sm:space-x-3 sm:items-center">
                        <label className="text-black">End at: </label> 
                        {session.actual_end_time === session.estimated_end_time ? (
                        <label className="text-green">{formatDate(session.actual_end_time)}</label>
                        ) : (
                        <div className="flex flex-col sm:flex-row sm:space-x-1">
                            <label className="text-alter">{formatDate(session.actual_end_time)}</label>
                            <label className="text-black sm:inline block">
                            (break <span className="text-alter">{session.break_point}</span> times)
                            </label>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex sm:w-2/10 justify-end items-center">
                <button type="button" onClick={handleDetail}
                className="cursor-pointer bg-transparent text-dark
                     hover:text-primary sm:transition duration-200"
                >
                    <FaArrowRight className="sm:text-2xl text-xl" />
                </button>
            </div>
        </div>
    )
}
export default SessionCard;