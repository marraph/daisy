import React, {ReactNode} from "react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface ColumnChartProps {
    data: any;
    xAxis_dataKey: string;
    yAxis_dataKey: string;
    customTooltip?: ReactNode;
    color?: string;
}


const ColumnChart: React.FC<ColumnChartProps> = ({data, xAxis_dataKey, yAxis_dataKey, customTooltip, color = "#8884d8" }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={800}
                      height={400}
                      data={data}
            >
                <CartesianGrid vertical={false}
                               opacity={0.5}
                               horizontalCoordinatesGenerator={(props) => props.height > 250 ? [75, 150, 225] : [100, 200]}
                />

                <XAxis dataKey={xAxis_dataKey}
                       tickMargin={8}
                       axisLine={false}
                       tickLine={false}
                       tick={<CustomTick x={undefined} y={undefined} payload={undefined}/>}
                />
                <YAxis tickLine={false}
                       tick={false}
                       axisLine={false}
                />
                <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} customTooltip={customTooltip}/>}
                         cursor={false}
                />
                <Bar dataKey={yAxis_dataKey}
                     fill={color}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

const CustomTooltip = ({ active, payload, label, customTooltip }) => {
    if (active && payload && payload.length) {
        return (
            <div className={"rounded-lg bg-black-light dark:bg-zinc-100 border border-edge dark:border-zinc-300 p-2"}>
                {customTooltip ?
                    customTooltip
                    :
                    <p className={"text-white dark:text-zinc-800"}>{`${label} : ${payload[0].value}`}</p>
                }
            </div>
        );
    }

    return null;
};

const CustomTick = ({x, y, payload}) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={10}
                  textAnchor={"middle"}
                  className={"fill-zinc-800 dark:fill-zinc-400 text-sm"}
            >
                {payload.value}
            </text>
        </g>
    );
}

export { ColumnChart };