import React, {useRef} from 'react';
import {Combobox, ComboboxItem, ComboboxRef} from './Combobox';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch} from "lucide-react";
import {Button} from "../button/Button";

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

type Project = {
    id: number;
    name: string;
    user: string;
    description: string | null;
}

const items: Project[] = [
    {id: 1, name: "Project 1", user: "User 1", description: "Description 1"},
    {id: 2, name: "Project 2", user: "User 2", description: "Description 2"},
    {id: 3, name: "Project 3", user: "User 3", description: "Description 3"},
];

export const Default: Story = {
    render: () => {


        return (
            <Combobox
                buttonTitle={"Title"}
                icon={<GitBranch size={12} className={"mr-2"}/>}
                onValueChange={(value) => console.log(value)}
                getItemTitle={(item: Project) => item.name}
            >
                {items.map((item, index) => (
                    <ComboboxItem key={index} title={item.name} value={item}/>
                ))}
            </Combobox>
        );
    },
};