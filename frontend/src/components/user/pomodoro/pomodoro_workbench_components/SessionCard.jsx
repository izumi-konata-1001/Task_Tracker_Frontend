function SessionCard(proprs){
    const selectedTask = proprs.selectedTask;
    const duration = proprs.duration;
    const note = proprs.note;
return(
    <div className="w-full px-4 py-2 bg-white border-2 border-dark flex flex-row rounded-xl">
        <div className="w-3/5 flex flex-col items-center">
            <div className="w-full flex sm:flex-row sm:space-x-2 flex-col">
                <label className="text-base">Task Title: </label>
                <label className="text-primary text-base font-medium break-words">{selectedTask.title}</label>
            </div>
            <div className="w-full">
                {(note!=null) ? (
                    <div className="w-full flex flex-col">
                        <label className="text-base text-black">Session Note: </label>
                        <label className="text-base text-primary break-words">{note}</label>
                    </div>):
                    (<p className="text-base text-shadow">Session Note: /</p>)}
            </div>
        </div>
        <div className="w-2/5 flex items-center">
            <p className="w-full text-right text-xl font-bold text-primary">{duration} mins</p>
        </div>
    </div>
)
}
export default SessionCard;