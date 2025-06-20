import CreateButton from "../CreateButton";
import FilterButton from "../FilterButton";
import IssueCard from "./all_issues_components/IssueCard";

function AllIssues(){
    return(
        <div class="w-full">
            <div class="w-full flex justify-center items-center pt-5">
                <h1 class="text-2xl font-bold">Issues</h1>
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <CreateButton section={"issue"}/>
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <FilterButton />
            </div>
            <div class="w-full pt-5 px-20">
                <IssueCard />
            </div>
        </div>
    )
    
}

export default AllIssues;