import React, {ReactNode} from "react";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface AreaChartProps {
    data: any;
    xAxis_dataKey: string;
    yAxis_dataKey: string;
    customTooltip?: ReactNode;
    color?: string;
    gradient?: boolean;
    margin?: { top: number, right: number, left: number, bottom: number };
    type?: 'basis' | 'basisClosed' | 'basisOpen' | 'bumpX' | 'bumpY' | 'bump' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';
}

const RegionChart: React.FC<AreaChartProps> = ({ data, xAxis_dataKey, yAxis_dataKey, customTooltip, color = "#8884d8", gradient = false, type = "monotone", margin = { top: 10, right: 50, left: 0, bottom: 0 } }) => {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={800}
                height={400}
                data={data}
                margin={margin}
            >
                {gradient &&
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="2%" stopColor={color} stopOpacity={0.8}/>
                            <stop offset="98%" stopColor={color} stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                }

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
                <Area type={type}
                      dataKey={yAxis_dataKey}
                      stroke={color}
                      fillOpacity={1}
                      fill={gradient ? "url(#colorUv)" : color}
                      opacity={!gradient && 0.7}

                />
            </AreaChart>
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

const CustomTick = ({ x, y, payload}) => {
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

export {RegionChart};