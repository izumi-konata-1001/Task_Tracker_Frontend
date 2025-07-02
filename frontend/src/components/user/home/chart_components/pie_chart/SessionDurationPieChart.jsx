import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SessionDurationPieChart({session}){
    const data = [
        { name: "5 mins", value: session?.durationCount?.five ?? 0 },
        { name: "15 mins", value: session?.durationCount?.fifteen ?? 0 },
        { name: "25 mins", value: session?.durationCount?.twentyFive ?? 0 },
        { name: "50 mins", value: session?.durationCount?.fifty ?? 0 },
    ];
    const COLORS = {
        "5 mins": "#3fbac2",
        "15 mins": "#50C878",
        "25 mins": "#f73859",
        "50 mins": "#4d606e",
    };

    return(
        <div className="min-h-[230px] w-full flex flex-col items-center justify-center bg-white rounded-xl p-3">
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
                        fill={COLORS[entry.name] || "#ccc"} // fallback color if name not matched
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

export default SessionDurationPieChart;