import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Switch} from "./Switch";
import { Button } from '../button/Button';

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
            <div className={"flex flex-row items-center space-x-12"}>
                <Switch/>
                <Button text={"button"} className={"h-8"}></Button>
            </div>

        );
    },
};