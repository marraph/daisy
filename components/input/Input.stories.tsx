import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Input} from "./Input";
import {Hourglass} from "lucide-react";

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>

export const Default: Story = {
    render: () => {
        return (
            <Input placeholder={"Small input"}
                   elementSize={"medium"}
                   label={"Label"}
                   icon={<Hourglass size={16}/>}
            />
        );
    },
};
