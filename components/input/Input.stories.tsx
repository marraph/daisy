import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Input} from "./Input";
import {Hourglass} from "lucide-react";
import {Combobox} from "../combobox/Combobox";

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
            <div className={"flex flex-row items-center"}>
                <Input placeholder={"Small input"} elementSize={"medium"}
                       icon={<Hourglass size={16}/>}/>
                <Combobox buttonTitle={"hello"} size={"medium"}></Combobox>
            </div>
        );
    },
};
