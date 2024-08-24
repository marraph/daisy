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
    {id: 4, name: "Project 4", user: "User 4", description: "Description 4"},
    {id: 5, name: "Project 5", user: "User 5", description: "Description 5"},
    {id: 6, name: "Project 6", user: "User 6", description: "Description 6"},
    {id: 7, name: "Project 7", user: "User 7", description: "Description 7"}

];

export const Default: Story = {
    render: () => {


        return (
            <div className={"flex flex-row space-x-2"}>
                <Combobox
                    buttonTitle={"Title"}
                    size={"small"}
                    icon={<GitBranch size={12}/>}
                    onValueChange={(value) => console.log(value)}
                    getItemTitle={(item: Project) => item.name}
                    highlightQuery={true}
                    searchField={true}
                >
                    {items.map((item, index) => (
                        <ComboboxItem key={index} title={item.name} value={item}/>
                    ))}
                </Combobox>

                <Combobox
                    buttonTitle={"Title"}
                    size={"small"}
                    icon={<GitBranch size={12}/>}
                    onValueChange={(value) => console.log(value)}
                    getItemTitle={(item: Project) => item.name}
                    highlightQuery={true}
                    searchField={true}
                >
                    {items.map((item, index) => (
                        <ComboboxItem key={index} title={item.name} value={item}/>
                    ))}
                </Combobox>
            </div>
        );
    },
};