import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {InputSelect} from "@/components/inputselect/InputSelect";
import {CalendarCheck, CalendarClock} from "lucide-react";

const meta: Meta<typeof InputSelect> = {
    title: "Components/InputSelect",
    component: InputSelect,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputSelect>

export const Default: Story = {
    render: () => {
        return (
            <InputSelect
                type={"schedule"}
                icon={<CalendarClock size={20} />}
                placeholder={"Write a schedule"}
            />
        );
    },
};