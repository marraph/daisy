import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {ScheduleSelect} from "@/components/scheduleselect/ScheduleSelect";
import {CalendarClock} from "lucide-react";

const meta: Meta<typeof ScheduleSelect> = {
    title: "Components/ScheduleSelect",
    component: ScheduleSelect,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ScheduleSelect>

export const Default: Story = {
    render: () => {
        return (
            <ScheduleSelect
                label={"Schedule"}
                icon={<CalendarClock size={20} />}
                placeholder={"Write a schedule"}
                onValueChange={(value) => console.log(value)}
            />
        );
    },
};