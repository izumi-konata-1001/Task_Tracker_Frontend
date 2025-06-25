function SessionInformation(props){
    const session = props.session;

    return(
        <div class="w-full flex flex-col space-y-2 justify-center px-30">
            <div class="w-full flex justify-center items-center">
                <label class="text-shadow font-base">———— Session ————</label>
            </div>
            <div class="w-full flex flex-row justify-between">
                <label class="text-base text-black">Note:</label>
                {session.note ? (
                    <label class="text-xl text-primary font-semibold">{session.note}</label>
                ):(
                    <label class="text-xl text-shadow font-semibold">/</label>
                )}
            </div>

            <div class="w-full flex flex-row justify-between">
                <label class="text-base text-black">Duration:</label>
                <label class="text-xl text-primary font-semibold">{session.duration_minutes} mins</label>
            </div>

            <div class="w-full flex flex-row justify-between">
                <label class="text-base text-black">Start At:</label>
                <label class="text-xl text-green font-semibold">{session.start_time}</label>
            </div>
            <div class="w-full flex flex-row justify-between">
                <label class="text-base text-black">Estimated End At:</label>
                <label class="text-xl text-primary font-semibold">{session.estimated_end_time}</label>
            </div>
            <div class="w-full flex flex-row justify-between">
                <label class="text-base text-black">Acutual End At: </label>
                {session.actual_end_time == session.estimated_end_time ? (
                    <label class="text-xl text-primary font-semibold">{session.actual_end_time}</label>
                ):(
                    <label class="text-xl text-alter font-semibold">{session.actual_end_time}</label>
                )}
                
            </div>
            <div class="w-full flex flex-row justify-between">
                <label class="text-base text-black">Break Number:</label>
                {session.break_point == 0 ?(
                    <label class="text-xl text-black font-semibold"><label class="text-green">{session.break_point}</label> times</label>
                ):(
                    <label class="text-xl text-black font-semibold"><label class="text-alter">{session.break_point}</label> times</label>
                )}
                
            </div>
        </div>
    )
}

export default SessionInformation;