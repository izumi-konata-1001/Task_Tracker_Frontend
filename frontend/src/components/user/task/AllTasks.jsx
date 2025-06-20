import TaskCard from './all_tasks_components/TaskCard';
import FilterButton from '../FilterButton';
import CreateButton from '../CreateButton';

function AllTasks(){
    return(
        <div class="w-full">
            <div class="w-full flex justify-center items-center pt-5">
                <h1 class="text-2xl font-bold">Tasks</h1>
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <CreateButton section={"task"}/>
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <FilterButton />
            </div>
            <div class="w-full pt-5 px-20">
                <TaskCard />
            </div>
        </div>
    )
}

export default AllTasks;