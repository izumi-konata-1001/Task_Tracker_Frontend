import CreateIssueForm from "./create_issue_components/CreateIssueForm";
import AddTaskSelector from "./create_issue_components/AddTaskSelector";
import SelectedTaskList from "./create_issue_components/SelectedTaskList";
import SubmitButton from "./create_issue_components/SubmitButton";
import BackButton from "../../BackButton";

function CreateIssue(){

    return(
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <div class="w-full px-40">
                <BackButton />
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <h1 class="text-2xl font-bold">Create New Issue</h1>
            </div>
            <div class="w-full pt-5">
                <div class="w-full pb-5">
                    <CreateIssueForm />
                </div>
                <div class='w-full pb-2'>
                    <SelectedTaskList />
                </div>
                <div class="w-full pb-3">
                    <AddTaskSelector />
                </div>

                <div class="w-full">
                    <SubmitButton />
                </div>
                
            </div>
        </div>
    )
}

export default CreateIssue;