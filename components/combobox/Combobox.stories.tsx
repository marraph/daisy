import React from 'react';
import {Combobox, ComboboxItem} from './Combobox';
import {Meta, StoryObj} from "@storybook/react";

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

const items = ["Option 1", "Option 2", "Option 3"];

export const Default: Story = {
    render: () => {
        return (
            <Combobox  size={"medium"} buttonTitle={"Select an option"}>
                {items.map((item, index) => (
                    <ComboboxItem key={index} title={item} size={"medium"}/>
                ))}
            </Combobox>
        );
    },
};