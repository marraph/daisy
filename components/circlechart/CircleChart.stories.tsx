import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {CircleChart} from "@/components/circlechart/CircleChart";

const meta: Meta<typeof CircleChart> = {
    title: "Components/CircleChart",
    component: CircleChart,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CircleChart>;

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
            <CircleChart data={data}
                         dataKey={"value"}
                         nameKey={"name"}
                         color={"#355E3B"}
            />

        </div>
    );
};