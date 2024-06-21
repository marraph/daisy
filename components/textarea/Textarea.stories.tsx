import React, {useRef} from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Textarea, TextareaRef} from "./Textarea";

const meta: Meta<typeof Textarea> = {
    title: "Components/Textarea",
    component: Textarea,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
    render: () => {

        const textRef = useRef<TextareaRef>(null);

        return (
            <>
                <Textarea placeholder={"Small input"} ref={textRef}></Textarea>
                <p>{textRef.current?.getValue()}</p>
            </>
        );
    },
};