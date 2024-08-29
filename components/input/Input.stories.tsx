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
            <Input placeholder={"Medium input"}
                   elementSize={"medium"}
                   label={"Label"}
                   icon={<Hourglass size={16}/>}
                   successMessage={"Input is correct"}
                   warningMessage={"Input is almost correct"}
                   validationRules={[
                       (value) => ({
                           isValid: value.length > 0,
                           message: "Input must not be empty",
                       }),
                       (value) => ({
                           isValid: value.length < 10,
                           message: "Input can only be 10 characters long",
                       })
                   ]}
            />
        );
    },
};
