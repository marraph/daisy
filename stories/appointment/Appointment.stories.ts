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

type Story = StoryObj<typeof meta>

export const Blue: Story = {
    args: {
        theme: "blue",
        title: "Team Meeting",
        description: "03:00 PM - 04:00 PM",
    },
};

export const Green: Story = {
    args: {
        theme: "green",
        title: "Team Meeting",
        description: "03:00 PM - 04:00 PM",
    },
};

export const Purple: Story = {
    args: {
        theme: "purple",
        title: "Team Meeting",
        description: "03:00 PM - 04:00 PM",
    },
};

export const Pink: Story = {
    args: {
        theme: "pink",
        title: "Team Meeting",
        description: "03:00 PM - 04:00 PM",
    },
};

export const Yellow: Story = {
    args: {
        theme: "yellow",
        title: "Team Meeting",
        description: "03:00 PM - 04:00 PM",
    },
};