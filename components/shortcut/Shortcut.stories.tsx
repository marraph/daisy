import React from "react";
import {Shortcut} from "./Shortcut";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Shortcut> = {
    title: "Components/Shortcut",
    component: Shortcut,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Shortcut>;

export const Default: Story = {
    render: () => {
        return (
            <Shortcut text={"⌘ S"}></Shortcut>
        );
    },
};