import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {TimePicker} from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
    title: "Components/TimePicker",
    component: TimePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TimePicker>

export const Default: Story = {
    render: () => {
        return (
            <TimePicker label={"Label"}
                        withMeridiem={true}
                        onValueChange={(value) => console.log(value)}
            />
        );
    },
};
