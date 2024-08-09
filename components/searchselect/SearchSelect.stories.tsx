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


export const Default: Story = {
    render: () => {

        const items = ["Option 1", "Option 2", "Option 3", "Option 4"];

        return (
            <div className={"flex flex-row space-x-2"}>
            <SearchSelect size={"small"}
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
                <Combobox buttonTitle={"wgwg"} label={"wugwub"} size={"small"}>
                    <ComboboxItem title={"Option 1"}/>
                </Combobox>
            </div>
        );
    },
};