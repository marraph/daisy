import React from 'react';
import {SearchSelect, SearchSelectItem} from './SearchSelect';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch} from "lucide-react";

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


export const Default: Story = {
    render: () => {

        const items = ["Option 1", "Option 2", "Option 3", "Option 4"];

        return (
            <SearchSelect size={"medium"}
                          buttonTitle={"Title"}
                          icon={<GitBranch size={12}/>}
                          label={"Label"}
            >
                {items.map((item, index) => (
                    <SearchSelectItem key={index}
                                      title={item}
                    />
                ))}
            </SearchSelect>
        );
    },
};