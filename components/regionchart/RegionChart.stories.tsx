import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {RegionChart} from "@/components/regionchart/RegionChart";

const meta: Meta<typeof RegionChart> = {
    title: "Components/RegionChart",
    component: RegionChart,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RegionChart>;

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
            <RegionChart data={data}
                         xAxis_dataKey={"name"}
                         yAxis_dataKey={"value"}
                         color={"#355E3B"}
                         gradient={true}
            />

        </div>
    );
};