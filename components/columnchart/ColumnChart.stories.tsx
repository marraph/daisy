import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {ColumnChart} from "@/components/columnchart/ColumnChart";

const meta: Meta<typeof ColumnChart> = {
    title: "Components/ColumnChart",
    component: ColumnChart,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ColumnChart>;

export const Default = () => {

    const data = [
        {
            name: 'Page A',
            value: 3000,
        },
        {
            name: 'Page B',
            value: 4000,
        },
        {
            name: 'Page C',
            value: 1000,
        },
        {
            name: 'Page D',
            value: 2500,
        }
    ];

    return (
        <div className={"w-[600px] h-[350px] rounded-lg bg-zinc-100 dark:bg-black-light border border-zinc-300 dark:border-edge p-2"}>
            <ColumnChart data={data}
                         xAxis_dataKey={"name"}
                         yAxis_dataKey={"value"}
                         color={"#355E3B"}
            />

        </div>
    );
};