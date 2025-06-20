import { useState } from "react";

import IssueInformation from "./issue_detail_components/IssueInformation";
import TaskList from "./issue_detail_components/TaskList";
import AddTaskSelector from "./issue_detail_components/AddTaskSelector";
import EditIssueForm from "./issue_detail_components/EditIssueForm";
import EditTaskOrder from "./issue_detail_components/EditTaskOrder";

function IssueDetail(){
const issue = {
  id: 101,
  title: "Improve User Registration Flow",
  description: "Refactor the user registration flow to reduce friction and improve validation clarity.",
  created_at: "2024-06-10T09:30:00Z",
  updated_at: "2024-06-15T14:45:00Z"
};

const availableTasks = [
  { id: 201, title: "Design registration UI" },
  { id: 202, title: "Set up backend validation" },
  { id: 203, title: "Test edge cases" },
  { id: 204, title: "Write unit tests" }
];

const tasksBelongToIssue = [
  { id: 301, title: "Update error messages", step_number: 1, completed: 1 },
  { id: 302, title: "Add email verification", step_number: 2, completed: 0 },
  { id: 303, title: "Review with QA team", step_number: 3, completed: 0 }
];

    const [showEditIssue, setShowEditIssue] = useState(false);
    const [showEditOrder, setShowEditOrder] = useState(false);

    const onShowEditIssue = () =>{
        setShowEditIssue(true);
    }

    const onCancelEditIssue = () =>{
        setShowEditIssue(false);
    }

    const onShowEditOrder = () =>{
        setShowEditOrder(true);
    }

    const onCancelEditOrder = () =>{
        setShowEditOrder(false);
    }

    return(
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <div class="w-full">
                <IssueInformation issue={issue}/>
            </div>

            <div class="w-full pt-4">
                <TaskList tasksBelongToIssue={tasksBelongToIssue}/>
            </div>

            <div class="w-full pt-4">
                <AddTaskSelector availableTasks={availableTasks}/>
            </div>

            <div class="w-full pt-5 px-30 flex justify-center items-center text-center">
                <button onClick={onShowEditOrder}
                class="w-full bg-dark text-white border-2 border-dark  px-2 py-1 rounded-md hover:bg-light hover:text-dark transition-colors duration-300">
                    Change Order
                </button>
            </div>

            <div class="w-full pt-5 px-30 flex justify-center items-center text-center">
                <button onClick={onShowEditIssue}
                class="w-full bg-primary text-white border-2 border-primary  px-2 py-1 rounded-md hover:bg-light hover:text-primary transition-colors duration-300">Edit Issue</button>
            </div>

            {showEditIssue && 
                <div class="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
                    <EditIssueForm issue={issue} onCancelEditIssue={onCancelEditIssue}/>
                </div>
            }

            {showEditOrder && 
                <div class="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
                    <EditTaskOrder />
                </div>
            }
        </div>
    )
}

export default IssueDetail;