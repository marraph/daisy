import React, {useRef} from 'react';
import {Combobox, ComboboxItem, ComboboxRef} from './Combobox';
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

const items = ["Option 1", "Option 2 rinrihnire", "Option 3", "option 4", "option"];

export const Default: Story = {
    render: () => {

        const comboboxRef = useRef<ComboboxRef>(null);

        return (
            <Combobox size={"medium"} buttonTitle={"Title"} ref={comboboxRef} maxItemsPerColumn={5}>
                {items.map((item, index) => (
                    <ComboboxItem key={index} title={item} size={"medium"}/>
                ))}
            </Combobox>
        );
    },
};