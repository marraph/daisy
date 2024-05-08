import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {DatePicker} from "./DatePicker";
import {CalendarDays} from "lucide-react";

const meta: Meta<typeof DatePicker> = {
    title: "Components/DatePicker",
    component: DatePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
    render: () => {
        return (
            <DatePicker text={"Select a date"} icon={<CalendarDays size={22}/>}>

            </DatePicker>
        );
    },
};