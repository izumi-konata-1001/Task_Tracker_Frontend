function TaskCard(){
    return(
        <div class="bg-white border-2 border-dark rounded-lg p-5 shadow-sm w-full flex justify-between items-center">
            <div class="flex flex-col">
                <h2 class="text-xl font-semibold text-dark mb-1">
                    Title
                </h2>
                <p class="text-sm text-shadow">
                    Created At: 00/00/0000
                </p>
            </div>
            <div>
                <p class="text-sm font-medium text-right">
                    Completed
                </p>
            </div>
        </div>
    )
}

export default TaskCard;