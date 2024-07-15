import React from 'react';
import {Combobox, ComboboxItem} from './Combobox';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch} from "lucide-react";

const meta: Meta<typeof Combobox> = {
    title: "Components/Combobox",
    component: Combobox,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Combobox>

export const Default: Story = {
    render: () => {

        const items = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6", "Option 7", "Option 8", "Option 9", "Option 10"];

        return (
            <Combobox size={"medium"}
                      buttonTitle={"Title"}
                      icon={<GitBranch size={12} className={"mr-2"}/>}
                      onValueChange={(value) => console.log(value)}
                      label={"Label"}
            >
                {items.map((item, index) => (
                    <ComboboxItem key={index} title={item} size={"medium"}/>
                ))}
            </Combobox>
        );
    },
};