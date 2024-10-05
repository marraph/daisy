import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {EmojiPicker} from "@/components/emojipicker/EmojiPicker";

const meta: Meta<typeof EmojiPicker> = {
    title: "Components/EmojiPicker",
    component: EmojiPicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EmojiPicker>

export const Default: Story = {
    render: () => {
        return (
            <EmojiPicker perLine={8}/>
        );
    },
};