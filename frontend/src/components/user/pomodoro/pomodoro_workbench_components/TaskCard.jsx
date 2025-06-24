function TaskCard(proprs){
    const selectedTask = proprs.selectedTask;
    const duration = proprs.duration;
    const note = proprs.note;
return(
    <div class="w-full">
        <div class="w-full px-4 py-2 bg-white border-2 border-dark flex flex-row rounded-xl">
            <div class="w-3/5 flex flex-col items-center">
                <div class="w-full">
                    <p class="text-xl font-semibold">{selectedTask.title}</p>
                </div>
                <div class="w-full">
                    <p class="text-base text-shadow">{selectedTask.description}</p>
                </div>
                <div class="w-full">
                    {(note==null) ? (<p class="text-base text-shadow">Note: {note}</p>):(<></>)}
                </div>
            </div>
            <div class="w-2/5 flex items-center">
                <p class="w-full text-right text-xl font-bold text-dark">{duration} mins</p>
            </div>
        </div>
    </div>
)
}
export default TaskCard;