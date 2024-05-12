import React from 'react';
import {Combobox, ComboboxIcon, ComboboxItem} from './Combobox';
import {Meta, StoryObj} from "@storybook/react";
import {Aperture} from "lucide-react";

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
            <Combobox buttonTitle={"Select an option"}>
                <ComboboxItem title={"Option 1w fwgwgmiwgwgiwg"}>
                    <ComboboxIcon icon={<Aperture size={22}/>} />
                </ComboboxItem>
                <ComboboxItem title={"Option 2"} />
                <ComboboxItem title={"Option 3"} />
            </Combobox>
        );
    },
};