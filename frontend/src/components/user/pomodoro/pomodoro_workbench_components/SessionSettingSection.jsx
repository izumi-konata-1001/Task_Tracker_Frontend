import { useState,useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import BASE_URL from "../../../../utils/api";

function SessionSettingSection(props){
    const {token} = useAuth();
    const setVisibleTaskCard = props.setVisibleTaskCard;
    const setStartAvaliable = props.setStartAvaliable;
    const setSessionSnapshot = props.setSessionSnapshot;
    const hasActiveCard = props.hasActiveCard;
    const setHasActiveCard = props.setHasActiveCard;

    const [message,setMessage] = useState("");
    const [selectorSourceMessage, setSelectorSourceMessage] = useState("");
    const [selectorTaskMessage, setSelectorTaskMessage] = useState("");

    const [note, setNote] = useState("");
    const [issues,setIssues] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});
    const [selectedDuration, setSelectedDuration] = useState(0);
    const [availableAdd, setAvailableAdd] = useState(false);

    const fetchAllAvaliableIssues = async ()=>{
        setAvailableAdd(false);
        try{
            const response = await fetch(`${BASE_URL}/issue/avaliable_issues`, {
                method:'GET',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();

            if(response.ok){
                setIssues(result.issues);
                console.log('Fetch avaliable issues successfully.');
                return;
            }else if(response.status == 404){
                setIssues(null);
                setSelectorSourceMessage('No issue has imcompleted task or no issue created yet. You can only select from incompleted tasks');
                return;
            }
            else{
                setSelectorSourceMessage('Fetch avaliable issue failed in database.');
                console.error('Fetch avaliable issue failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch avaliable issue failed, network or unexpected error.')
            console.error('Fetch avaliable issue failed, error:', error);
            return;
        }
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            await fetchAllAvaliableIssues();
        }
        fetchData();
    },[token]);

    const handleSelectGroup = (e)=>{
        const value = e.target.value;
        if(value == "task"){
            fetchAllTasksData();
            return;
        }
        else if(value == null){
            return;
        }
        else{
            fetchAvaliableTasksBelongToIssueData(value);
            return;
        }
    }

    const fetchAllTasks = async () =>{
        setAvailableAdd(false);
        try{
            const response = await fetch(`${BASE_URL}/task/incompleted`,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if(response.ok){
                setTasks(result.tasks);
                setAvailableAdd(true);
                console.log('Get all incompleted tasks succesffuly.');
                return;
            }else if(response.status == 404){
                setSelectorTaskMessage('No task is incompleted. Please create task in progressing first.');
                return;
            }else{
                setSelectorTaskMessage('Fetch all incompleted tasks failed.');
                console.error('etch all incompleted tasks failed, error:' ,result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch all incompleted tasks failed, network or unexpected error.')
            console.error('Fetch all incompleted tasks failed, error:', error);
            return;
        }
    }

    const fetchAllTasksData = async()=>{ await fetchAllTasks();}

    const fetchAvaliableTasksBelongToIssue = async(issueId) =>{
        setAvailableAdd(false);
        try{
            const response = await fetch(`${BASE_URL}/issue/incompleted_tasks`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({
                    issueId:issueId,
                }),
            });
            const result = await response.json();
            if(response.ok){
                setTasks(result.tasks);
                console.log('Fetch incompleted tasks belong to issue succesffully.');
                return;
            }else if(response.status == 404){
                setSelectorTaskMessage('No avaliable tasks in this issue.');
                console.error('Fetch avaliable task failed, error:', result.error);
                return;
            }else{
                setSelectorTaskMessage('Fetch avaliable task failed.');
                console.error('Fetch avaliable task failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch avaliable tasks belong to issue failed, network or unexpected error.')
            console.error('Fetch avaliable tasks belong to issue failed, error:', error);
            return;
        }
    }

    const fetchAvaliableTasksBelongToIssueData = async (issueId)=>{
        await fetchAvaliableTasksBelongToIssue(issueId);
    }

    const handleSelectTask = (e) => {
        const selectedId = parseInt(e.target.value);
        const task = tasks.find((task) => task.id === selectedId);

        if (task) {
            setTask(task);
            setAvailableAdd(true);
            return;
        }
        return;
    };

    const handleDuration = (e) => {
    const { name, value } = e.target;
        if (name === "duration") {
            setSelectedDuration(Number(value));
            return;
        }
        return;
    };

    const handleAdd = async ()=>{
        setVisibleTaskCard(true);
        setStartAvaliable(true);
        setSessionSnapshot({
            task: task,
            duration: selectedDuration,
            note: note
        });
        setHasActiveCard(true);
        setSelectedDuration(0);
        setTask({});
        setNote("");
        return;
    }
    const handleNote = (e)=>{
        const {name, value} = e.target;
        if(name=="note")
            setNote(value);
        return;
    }

    return(
        <div className="w-full flex flex-col">
            <p className="text-sm text-alter text-center">{message}</p>
            
            <div className="w-full flex flex-col justify-center items-center space-y-3">
                <div className="w-full">
                    <p className="w-full text-sm text-alter text-start">{selectorSourceMessage}</p>
                    <p className="text-base font-bold text-black">Select Task Source:</p>
                    <p className="text-sm font-normal text-shadow">(Choose from All Tasks or a Specific Issue)</p>
                    <select onChange={handleSelectGroup}
                    className="w-full bg-white text-center border-2 border-primary rounded-md py-2 px-3 sm:text-base text-sm h-full">
                        <option value="">—— Filter by Issue or Show All Tasks ——</option>
                        <option value="task">All incompleted tasks</option>
                        {issues && issues.length > 0 ?(
                            issues.map((issue)=>(
                                <option key={issue.id} value={issue.id}>{issue.title}</option>
                            ))
                        ):(null)}
                   </select>
                </div>

                <div className="w-full">
                    <p className="text-sm text-alter text-start">{selectorTaskMessage}</p>
                    <p className="text-base font-bold text-black">Select Task in Scope:</p>
                    <select onChange={handleSelectTask}
                    className="w-full bg-white text-center border-2 border-primary rounded-md py-2 px-3 sm:text-base text-sm h-full">
                        <option value="">—— Select task ——</option>
                        {tasks && tasks.length > 0 ?(
                            tasks.map((task)=>(
                                <option key={task.id} value={task.id}>{task.title}</option>
                            ))
                        ):(null)}
                    </select>
                </div>
            </div>

            <div className="w-full pt-3 flex flex-col">
                <label className="text-base text-black font-bold">Session Duration: </label>
                <select
                name="duration"
                value={selectedDuration}
                onChange={handleDuration}
                className="w-full bg-white border-2 border-primary py-2 px-3 text-center sm:text-base text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
                >
                <option value="">— Select Duration —</option>
                <option value="5">5 minutes (Quick Task)</option>
                <option value="15">15 minutes (Short Session)</option>
                <option value="25">25 minutes (Pomodoro)</option>
                <option value="50">50 minutes (Deep Focus)</option>
                </select>
            </div>

            <div className="w-full pt-3 flex flex-col">
                <p className="w-full text-base text-black font-bold">Note: <label className="text-sm text-shadow font-normal">(no more than 50 characters)</label></p>
                <input 
                name="note"
                value={note}
                onChange={handleNote}
                maxLength={50}
                className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div className="w-full pt-3">
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={hasActiveCard || !availableAdd || selectedDuration === 0}
                    className={`w-full h-10 rounded-xl text-xl border-2
                        ${(!availableAdd || selectedDuration === 0)
                        ? 'bg-shadow text-white border-shadow cursor-not-allowed'
                        : 'cursor-pointer bg-dark text-white border-dark hover:bg-white hover:text-dark'}
                    `}
                    >
                    Add Session
                </button>
            </div>
        </div>
    )
}

export default SessionSettingSection;