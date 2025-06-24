function TimerButton(props){
    const paused = props.paused;
    const handleStart = props.handleStart;
    const handleResume = props.handleResume;
    const handlePause = props.handlePause;
    return(
        <div class="w-full flex flex-col space-y-2">
            <div class="w-full flex flex-row items-center justify-between space-x-2">
                <button type="button" onClick={handleStart}
                class="w-1/2 h-10 bg-green border-3 border-green rounded-xl text-white text-xl hover:bg-white hover:text-green">
                    Start
                </button>
                {!paused ? (
                    <button type="button" onClick={handlePause}
                    class="w-1/2 h-10 bg-alter border-3 border-alter rounded-xl text-white text-xl hover:bg-white hover:text-alter">
                        Pause
                    </button>
                ): (
                    <button type="button" onClick={handleResume}
                    class="w-1/2 h-10 bg-primary border-3 border-primary rounded-xl text-white text-xl hover:bg-white hover:text-primary">
                        Resume
                    </button>
                )}
            </div>
            <div class="w-full flex justify-center items-center">
                <button class="w-full h-10 bg-primary border-3 border-primary rounded-xl text-white text-xl hover:bg-white hover:text-primary">
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default TimerButton;