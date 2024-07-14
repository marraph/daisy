import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Switch} from "./Switch";

const meta: Meta<typeof Switch> = {
    title: "Components/Switch",
    component: Switch,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Switch>

export const Default: Story = {
    render: () => {
        return (
            <Switch preSelectedValue={true}/>

        );
    },
};