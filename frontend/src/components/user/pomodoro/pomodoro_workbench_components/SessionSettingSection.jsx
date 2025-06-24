import { useState,useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import BASE_URL from "../../../../utils/api";

function SessionSettingSection(props){
    const {token} = useAuth();
    const setDuration = props.setDuration;
    const setSelectedTask = props.setSelectedTask;
    const setVisibleTaskCard = props.setVisibleTaskCard;
    const setStartAvaliable = props.setStartAvaliable;
    const note = props.note;
    const setNote = props.setNote;

    const [message,setMessage] = useState("");
    const [selectorMessage, setSelectorMessage] = useState("");

    const [issues,setIssues] = useState([]);
    const [tasks, setTasks] = useState([]);
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
                setSelectorMessage('No issue has imcompleted task or no issue created yet.');
                return;
            }
            else{
                setSelectorMessage('Fetch avaliable issue failed in database.');
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
                setSelectorMessage('No incompleted tasks.');
                return;
            }else{
                setSelectorMessage('etch all incompleted tasks failed.');
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
                setSelectorMessage('No avaliable tasks in this issue.');
                console.error('Fetch avaliable task failed, error:', result.error);
                return;
            }else{
                setSelectorMessage('Fetch avaliable task failed.');
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
            setSelectedTask(task);
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
        setDuration(selectedDuration);
        setStartAvaliable(true);
        return;
    }
    const handleNote = (e)=>{
        const {name, value} = e.target;
        if(name=="note")
            setNote(value);
        return;
    }

    return(
        <div class="w-full flex flex-col justify-center items-center">
            <div class="w-full flex flex-col justify-center items-center space-y-1">
                <p class="text-xl text-dark font-bold ">Select the task</p>
                <p class="text-sm text-alter">{message}</p>
            </div>
            <div class="w-full flex flex-col justify-center items-center pt-3 space-y-4">
                <div class="w-full text-alter">
                    {selectorMessage}
                </div>
                <div class="w-full">
                    <select onChange={handleSelectGroup}
                    class="w-full bg-white text-center border-2 border-primary rounded-md py-2 px-3 text-sm h-full">
                        <option value="">—— Select Issue or see all tasks ——</option>
                        <option value="task">All incompleted tasks</option>
                        {issues && issues.length > 0 ?(
                            issues.map((issue)=>(
                                <option key={issue.id} value={issue.id}>{issue.title}</option>
                            ))
                        ):(null)}
                   </select>
                </div>
                <div class="w-full">
                    <select onChange={handleSelectTask}
                    class="w-full bg-white text-center border-2 border-primary rounded-md py-2 px-3 text-sm h-full">
                        <option value="">—— Select task ——</option>
                        {tasks && tasks.length > 0 ?(
                            tasks.map((task)=>(
                                <option key={task.id} value={task.id}>{task.title}</option>
                            ))
                        ):(null)}
                    </select>
                </div>
            </div>
            <div class="w-full pt-3 flex items-center space-x-3">
                <label class="text-base text-black font-bold">Duration: </label>
                <select
                name="duration"
                value={selectedDuration}
                onChange={handleDuration}
                className="w-full bg-white border border-dark px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
                >
                <option value="">— Select Duration —</option>
                <option value="5">5 minutes (Quick Task)</option>
                <option value="15">15 minutes (Short Session)</option>
                <option value="25">25 minutes (Pomodoro)</option>
                <option value="50">50 minutes (Deep Focus)</option>
                </select>
            </div>
            <div class="w-full pt-3 items-center">
                <p class="w-full text-left text-base text-black font-bold">Note:</p>
                <input 
                name="note" value={note} onChange={handleNote}
                class="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div class="w-full pt-3">
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!availableAdd || selectedDuration === 0}
                    className={`w-full h-10 rounded-xl text-xl border-2
                        ${(!availableAdd || selectedDuration === 0)
                        ? 'bg-shadow text-white border-shadow cursor-not-allowed'
                        : 'bg-dark text-white border-dark hover:bg-white hover:text-dark'}
                    `}
                    >
                    Add Session
                </button>
            </div>
        </div>
    )
}

export default SessionSettingSection;