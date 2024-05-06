import React from 'react';
import { Combobox, ComboboxItem } from './Combobox';
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

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        return (
            <Combobox buttonTitle={"Select an option"}>
                <ComboboxItem title={"Option 1"} />
                <ComboboxItem title={"Option 2"} />
                <ComboboxItem title={"Option 3"} />
            </Combobox>
        );
    },
};