import React, { useRef } from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {DateRangePicker, DateRangePickerRef} from "./DateRangePicker";

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
        const dRef = useRef<DateRangePickerRef>(null);
        return (
            <DateRangePicker text={"Select a range"} iconSize={12} size={"medium"} closeButton={true} ref={dRef}/>
        );
    },
};