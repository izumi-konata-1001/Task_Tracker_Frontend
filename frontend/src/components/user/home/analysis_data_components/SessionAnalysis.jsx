function SessionAnalysis(props){
    const session = props.session
    return(
        <div class="w-1/2 flex flex-col justify-center items-center bg-white px-10 py-10 rounded-xl">
            <div class="w-full flex flex-col">
                <div class="w-full flex justify-center">
                    <p class="text-2xl font-bold text-primary">Session Analysis</p>
                </div>
                 <div class="w-full flex justify-center space-x-3 text-xl">
                        <label>Session Number:</label>
                        {session.total > 0 ? (
                            <label class="font-semibold">{session.total}</label>    
                        ):(
                            <label class="text-shadow">{session.total}</label>    
                        )}
                            
                </div>
                <div class="w-full flex flex-row text-base">
                    <div class="w-1/2">
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
                            {session.durationCount && session.durationCount.tewenFive > 0? (
                                <label>{session.durationCount.twentyFive}</label>
                            ):(<label class="text-shadow">0</label>)}
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="w-full flex flex-row justify-start space-x-3">
                            <label>50 mins:</label>
                            {session.durationCount && session.durationCount.fifty > 0? (
                                <label>{session.durationCount.fifty}</label>
                            ):(<label class="text-shadow">0</label>)}
                        </div>
                            <div class="w-full flex flex-row justify-start space-x-3">
                            <label>Other duration:</label>
                            {session.durationCount && session.durationCount.other > 0 ? (
                                <label>{session.durationCount.other}</label>
                            ):(<label class="text-shadow">0</label>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionAnalysis;