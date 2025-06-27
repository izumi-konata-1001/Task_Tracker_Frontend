import TaskCompleteCountPieChart from './pie_chart/TaskCompleteCountPieChart';
import IssueCompleteCountPieChart from './pie_chart/IssueCompleteCountPieChart';
import SessionDurationPieChart from './pie_chart/SessionDurationPieChart';

import TaskBarChart from './bar_chart/TaskBarChart';
import SessionBarChart from './bar_chart/SessionBarChart';
function AnalysisChart({task, issue, session}){
    return(
        <div class="w-full flex flex-col space-y-3">
            <div className="w-full flex flex-row space-x-3">
                <div className="flex-1 flex flex-col items-center bg-white rounded-xl h-80 justify-start pt-4">
                    <p className="text-primary font-bold mb-3">Task Completion Status</p>
                    <TaskCompleteCountPieChart task={task} />
                </div>
                <div className="flex-1 flex flex-col items-center bg-white rounded-xl h-80 justify-start pt-4">
                    <p className="text-primary font-bold mb-3">Issue Completion Breakdown</p>
                    <IssueCompleteCountPieChart issue={issue} />
                </div>
                <div className="flex-1 flex flex-col items-center bg-white rounded-xl h-80 justify-start pt-4">
                    <p className="text-primary font-bold mb-3">Session Duration Summary</p>
                    <SessionDurationPieChart session={session} />
                </div>
            </div>
            <div class="w-full flex justifty-center items-center bg-white p-5 rounded-xl shadow">
                <TaskBarChart />
            </div>
            <div class="w-full flex justifty-center items-center bg-white p-5 rounded-xl shadow">
                <SessionBarChart />
            </div>
        </div>

    )
}

export default AnalysisChart;