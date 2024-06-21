import React, {useRef} from 'react';
import {SearchSelect, SearchSelectItem, SearchSelectRef} from './SearchSelect';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch} from "lucide-react";
import {Combobox} from "../combobox/Combobox";

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

const items = ["Option 1", "Option 2 rinrihnire", "Option 3"];

export const Default: Story = {
    render: () => {

        const searchselectRef = useRef<SearchSelectRef>(null);

        return (
            <div className={"flex flex-row"}>
                <SearchSelect size={"small"} buttonTitle={"Title"} ref={searchselectRef} icon={<GitBranch size={12} className={"mr-2"}/>}>
                    {items.map((item, index) => (
                        <SearchSelectItem key={index} title={item} size={"small"}/>
                    ))}
                </SearchSelect>
                <Combobox buttonTitle={"combo"} icon={<GitBranch size={12} className={"mr-2"}/>}>

                </Combobox>
            </div>
        );
    },
};