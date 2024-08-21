import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {DateRangePicker} from "./DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
    title: "Components/DateRangePicker",
    component: DateRangePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
    render: () => {
        return (
            <DateRangePicker text={"Select a range"}
                             size={"medium"}
                             dayFormat={"long"}
                             closeButton={true}
                             onRangeChange={(range) => console.log(range)}
            />
        );
    },
};