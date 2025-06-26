import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BASE_URL from "../../../../utils/api";
import { useAuth } from "../../../../context/AuthContext";

import {
  DndContext,
  closestCenter,
  useSensor, useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex items-center justify-between px-4 py-3 border border-shadow rounded-md bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-move"
        >
            <span className="text-sm font-semibold text-black w-1/4">Step {task.step_number}</span>
            <span className="text-sm text-black w-3/4 truncate">{task.title}</span>
        </div>
    );
}

function EditTaskOrder(props) {
    const {token} = useAuth();
    const navigate = useNavigate();
    const fetchIssueDetail = props.fetchIssueDetail;
    const tasksBelongToIssue = props.tasksBelongToIssue;
    const issueId = props.issueId;
    const onCancelEditOrder = props.onCancelEditOrder;

    const [message, setMessage] = useState("");
    const [tasks, setTasks] = useState(tasksBelongToIssue);
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = tasks.findIndex((task) => task.id === active.id);
            const newIndex = tasks.findIndex((task) => task.id === over?.id);
            setTasks(arrayMove(tasks, oldIndex, newIndex));
        }
    };

    const handleSave = async () => {
        const reordered = tasks.map((task, index) => ({
        id: task.id,
        step_number: index + 1,
        }));

        try {
            const response = await fetch(`${BASE_URL}/issue/reorder_tasks`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization':`Bearer ${token}`,
                },
                body: JSON.stringify({
                    tasks: reordered,
                    issueId: issueId, 
                }),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage("Change order successfully.");
                fetchIssueDetail();
                onCancelEditOrder();
                return;
            }else{
                setMessage("Change order failed.");
                console.error("Change order failed, error:",result.error);
                return;
            }
        }catch(error) {
            setMessage("Change order failed, network or unexpected error");
            console.error("Change order failed, error:", error);;
            return;
        }
    };

    return (
        <div class="flex justify-center items-center h-full w-full p-8">
            <div class="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
                <h2 class="text-xl font-bold text-center mb-4">Edit Task Order</h2>
                <p class="text-center text-shadow">{message}</p>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                        <div class="space-y-3">
                            {tasks.length > 0 ? (
                            tasks.map((task) => <SortableItem key={task.id} task={task} />)
                            ) : (
                            <p class="text-center text-sm text-shadow">No tasks in this issue.</p>
                            )}
                        </div>
                    </SortableContext>
                </DndContext>

                <div class="mt-5 flex flex-col space-y-3 justify-center">
                    <button onClick={handleSave}
                        disabled={tasks.length < 2}
                        className={`border-2 font-medium px-6 py-2 rounded-md transition-colors duration-300
                        ${tasks.length < 2 
                        ? 'bg-shadow text-white border-shadow cursor-not-allowed' 
                        : 'bg-primary text-white border-primary hover:bg-white hover:text-primary cursor-pointer'}`}
                    >
                        Save
                    </button>
                    <button onClick={()=>{onCancelEditOrder()}}
                        class="cursor-pointer bg-primary border-2 border-primary text-white hover:bg-white hover:text-primary font-medium px-6 py-2 rounded-md transition-colors duration-300"
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
}

export default EditTaskOrder;