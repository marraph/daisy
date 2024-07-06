import React, { useRef } from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {DatePicker, DatepickerRef} from "./DatePicker";

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
        const dRef = useRef<DatepickerRef>(null);
        return (
            <div className={"flex flex-row"}>
                <DatePicker text={"Select a date"}
                            iconSize={12} size={"medium"}
                            dayFormat={"long"}
                            closeButton={true}
                            ref={dRef}
                            onValueChange={(value) => console.log(value)}
                />
            </div>
        );
    },
};