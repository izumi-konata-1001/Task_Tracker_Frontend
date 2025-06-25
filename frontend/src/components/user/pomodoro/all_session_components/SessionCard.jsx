import { useNavigate } from "react-router-dom";

function SessionCard(props){
    const session = props.session;

    const navigate = useNavigate();

    const handleDetail = (e)=>{
        e.preventDefault();
        navigate(`/pomodoro/detail/${session.id}`);
    }

    return(
        <div onClick={handleDetail}
        class="cursor-pointer w-full flex flex-row px-6 py-5 justify-center items-center bg-white border-3 border-dark rounded-xl ">
            <div class="w-4/7 flex flex-col justify-center items-center">
                <div class="w-full flex justify-start items-center">
                    <p class="text-black text-2xl font-bold">{session.task.title}</p>
                </div>
                <div class="w-full flex justify-start items-center">
                    <p class="text-base">
                        <label class="text-black">Session Note: </label> 
                        {session.note ? (
                            <label class="text-shadow">{session.note}</label>
                        ): <label class="text-shadow">/</label>}
                    </p>
                </div>
                <div class="w-full flex flex-col justify-start">
                    <div class="w-full flex flex-row space-x-3 items-center">
                        <label class="text-black">Start at: </label> 
                        <label class="text-green">{session.start_time}</label>
                    </div>
                    <div class="w-full flex flex-row space-x-3 items-center">
                        <label class="text-black">End at: </label> 
                        {session.actual_end_time == session.estimated_end_time ? (
                            <label class="text-green">{session.actual_end_time}</label>
                        ):(
                            <label>
                                <label class="text-alter">{session.actual_end_time}</label>
                                <label class="text-black">(break <label class="text-alter">{session.break_point}</label> times)</label>
                            </label>
                            
                        )}
                    </div>
                </div>
            </div>
            <div class="w-2/7 flex flex-col justify-center items-center">
                <div class="w-full flex justify-start items-center">
                    <p>
                        <label class="text-base  text-black">Task status: </label>
                        {session.task.completed ? (
                            <label class="text-base font-bold text-green">completed</label>):(
                            <label class="text-base font-bold text-alter">incompleted</label>
                            )}
                    </p>
                </div>
                <div class="w-full flex justify-start items-center">
                    <p>
                        <label class="text-base text-black">Duration: </label>
                        <label class="text-base font-bold text-primary">{session.duration_minutes} mins</label>
                    </p>
                </div>
            </div>
            <div class="w-1/7 flex justify-end items-center">
                <button type="button" onClick={handleDetail}
                class="bg-white py-2 px-2 text-primary rounded-xl border-3 border-primary hover:bg-primary hover:text-white"
                >View detail</button>
            </div>
        </div>
    )
}
export default SessionCard;