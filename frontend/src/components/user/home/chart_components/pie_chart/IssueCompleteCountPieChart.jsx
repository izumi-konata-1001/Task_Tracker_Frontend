import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function IssueCompleteCountPieChart({issue}){
    const data = [
        { name: "Fully Completed", value: issue.fullyCompleted},
        { name: "Incompleted", value: issue.incompleted },
        { name: "No task", value: issue.noTask},
    ];

    const COLORS = {
        "Fully Completed": "#3fbac2",
        "Incompleted": "#f73859",
        "No task": "#d3d4d8"
    };

    return(
        <div className="min-h-[280px] w-full flex flex-col items-center justify-center bg-white rounded-xl p-3">
            <p className="text-black text-base font-medium">Issue Progress Analysis</p>
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                >
                    {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.name] || "#ccc"}
                    />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm">
                {data.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-1">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[entry.name] }} />
                        <span>{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default IssueCompleteCountPieChart