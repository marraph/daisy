import React from "react";
import {Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

interface CircleChartProps {
    data: any;
    dataKey: string;
    nameKey: string;
    color?: string;
}

const CircleChart: React.FC<CircleChartProps> = ({data, dataKey, nameKey, color = "#8884d8" }) => {
    return (
        <ResponsiveContainer width="100%"
                             height="100%"
        >
            <PieChart width={600}
                      height={600}
            >
                <Tooltip content={<CustomTooltip active={undefined} payload={undefined}/>}
                         cursor={false}
                />
                <Pie data={data}
                     dataKey={dataKey}
                     nameKey={nameKey}
                     fill={color}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className={"rounded-lg bg-black-light dark:bg-zinc-100 border border-edge dark:border-zinc-300 p-2"}>
                <p className={"text-white dark:text-zinc-800"}>{`${payload[0].name} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

export { CircleChart };