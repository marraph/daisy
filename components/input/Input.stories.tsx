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
            <div className={"flex flex-col space-y-2"}>
                <div className={"flex flex-row space-x-2"}>
                    <Input placeholder={"Medium input"}
                           elementSize={"medium"}
                           label={"Label"}
                           icon={<Hourglass size={16}/>}
                    />
                    <Input placeholder={"Medium input"}
                           elementSize={"medium"}
                           label={"Label"}
                    />
                </div>
                <div className={"flex flex-row space-x-2"}>
                    <Input placeholder={"Small input"}
                           elementSize={"medium"}
                           label={"Label"}
                           border={"none"}
                           icon={<Hourglass size={16}/>}
                    />
                    <Input placeholder={"Small input"}
                           elementSize={"medium"}
                           label={"Label"}
                           border={"none"}
                    />
                </div>
            </div>
        );
    },
};
