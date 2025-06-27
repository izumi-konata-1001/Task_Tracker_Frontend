function SessionAnalysis(props){
    const session = props.session
    return(
        <div class="w-1/3 min-h-[200px] flex flex-col bg-white px-6 py-6 rounded-xl">
            <div class="w-full flex justify-center">
                <p class="text-2xl font-bold text-primary">Session Analysis</p>
            </div>
            <div class="w-full flex flex-col space-y-1 pt-3">
                <div class="w-full flex flex-row justify-start items-center space-x-3">
                        <label>Session Number:</label>
                        {session.total > 0 ? (
                            <label class="text-primary">{session.total}</label>    
                        ):(
                            <label class="text-shadow">{session.total}</label>    
                        )}   
                </div>
                <div class="w-full flex flex-row justify-start space-x-3">
                    <label>5 mins:</label>
                    {session.durationCount && session.durationCount.five > 0? (
                        <label>{session.durationCount.five}</label>
                    ):(<label class="text-shadow">0</label>)}
                </div>
                <div class="w-full flex flex-row justify-start space-x-3">
                    <label>15 mins:</label>
                    {session.durationCount && session.durationCount.fifteen > 0? (
                        <label>{session.durationCount.fifteen}</label>
                    ):(<label class="text-shadow">0</label>)}
                </div>

                <div class="w-full flex flex-row justify-start space-x-3">
                    <label>25 mins:</label>
                    {session.durationCount && session.durationCount.twentyFive > 0? (
                        <label>{session.durationCount.twentyFive}</label>
                    ):(<label class="text-shadow">0</label>)}
                </div>
                <div class="w-full flex flex-row justify-start space-x-3">
                    <label>50 mins:</label>
                    {session.durationCount && session.durationCount.fifty > 0? (
                        <label>{session.durationCount.fifty}</label>
                    ):(<label class="text-shadow">0</label>)}
                </div>
            </div>
        </div>
    )
}

export default SessionAnalysis;