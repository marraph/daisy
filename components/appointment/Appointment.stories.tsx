import React from 'react';
import { Appointment } from './Appointment';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Appointment> = {
    title: "Components/Appointment",
    component: Appointment,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Appointment>

export const Default: Story = {
    render: () => {
        return (
            <Appointment theme={"blue"}
                         width={300}
                         height={200}
                         title={"Team Meeting"}
                         description={"03:00PM - 05:00PM"}
            />
        );
    }
};