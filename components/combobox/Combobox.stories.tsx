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

export const Default: Story = {
    render: () => {
        return (
            <Combobox  size={"large"} buttonTitle={"Select an option"}>
                <ComboboxItem size={"large"} title={"Option 1"} />
                <ComboboxItem size={"large"} title={"Option 2"} />
                <ComboboxItem size={"large"} title={"Option 3"} />
            </Combobox>
        );
    },
};