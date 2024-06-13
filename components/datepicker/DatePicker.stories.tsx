import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {DatePicker} from "./DatePicker";
import {Combobox} from "../combobox/Combobox";

const meta: Meta<typeof DatePicker> = {
    title: "Components/DatePicker",
    component: DatePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
    render: () => {
        return (
            <DatePicker preSelectedValue={new Date()} text={"Select a date"} iconSize={12} size={"medium"}/>
        );
    },
};