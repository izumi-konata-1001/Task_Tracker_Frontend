import { useState,useEffect } from 'react';
import BASE_URL from '../../../utils/api';

import { useAuth } from '../../../context/AuthContext';

import CreateButton from "../CreateButton";
import FilterButton from "../OrderSortButton";
import IssueCard from "./all_issues_components/IssueCard";

function AllIssues(){
    const {token} = useAuth();

    const [message, setMessage] = useState("");
    const [order, setOrder] = useState("DESC");
    const [issues, setIssues] = useState([]);

    const handleClick = ()=>{
        if(order == "ASC")
            setOrder("DESC");
        else
            setOrder("ASC");
    }

    const fetchAllIssues = async () =>{
        try{
            const response = await fetch(`${BASE_URL}/issue/all`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    order:order
                })
            })

            const result = await response.json();

            if(response.ok){
                setIssues(result.issues);
                return;
            }else if(response.status === 404){
                setMessage("No more issues.");
                return;
            }
            else{
                setMessage('No issue found.');
                console.error('Fetch all issues failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch all issues failed, network or unexpected error.')
            console.error('Fetch all issues failed, error:', error);
            return;
        }
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            await fetchAllIssues();
        }
        fetchData();
    },[order])


    return(
        <div class="w-full">
            <div class="w-full flex justify-center items-center pt-5">
                <h1 class="text-2xl font-bold">Issues</h1>
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <CreateButton section={"issue"}/>
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <FilterButton handleClick={handleClick} order={order} />
            </div>
            <div class="w-full pt-5 px-20 flex flex-col space-y-3">
                {issues.length > 0 ?(
                    issues.map((issue) =>(
                        <IssueCard key={issue.id} issue={issue}/>
                    ))
                ):(
                    <div>{message}</div>)}
            </div>
        </div>
    )
    
}

export default AllIssues;