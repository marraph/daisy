import React from 'react';
import {SearchSelect, SearchSelectItem} from './SearchSelect';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch} from "lucide-react";
import {Combobox, ComboboxItem} from "../combobox/Combobox";

const meta: Meta<typeof SearchSelect> = {
    title: "Components/SearchSelect",
    component: SearchSelect,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};


export default meta;

type Story = StoryObj<typeof SearchSelect>

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
            <SearchSelect
                buttonTitle={"Title"}
                icon={<GitBranch size={12} className={"mr-2"}/>}
                onValueChange={(value) => console.log(value)}
                getItemTitle={(item: Project) => item.name}
            >
                {items.map((item, index) => (
                    <SearchSelectItem key={index} title={item.name} value={item}/>
                ))}
            </SearchSelect>
        );
    },
};