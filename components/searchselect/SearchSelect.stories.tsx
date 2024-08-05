import React, {useRef} from 'react';
import {SearchSelect, SearchSelectItem, SearchSelectRef} from './SearchSelect';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch} from "lucide-react";
import {DatePicker} from "../datepicker/DatePicker";
import {Button} from "../button/Button";

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

        const items = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

        return (
            <div>

            <SearchSelect size={"small"}
                          buttonTitle={"Title"}
                          icon={<GitBranch size={12}/>}
                          label={"Label"}
                          preSelectedValue={"Option 1"}
            >
                {items.map((item, index) => (
                    <SearchSelectItem key={index}
                                      title={item}
                    />
                ))}
            </SearchSelect>
                <Button text={"button"}></Button>
            </div>

        );
    },
};