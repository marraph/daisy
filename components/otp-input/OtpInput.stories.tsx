import {Meta, StoryObj} from "@storybook/react";
import {OtpInput, OtpInputGroup, OtpInputSlot} from "../../components/otp-input/OtpInput";
import React from "react";

const meta: Meta<typeof OtpInput> = {
    title: "Components/OtpInput",
    component: OtpInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof OtpInput>

export const Default: Story = {
    render: () => {


        return (
            <OtpInput label={"OTP"}>
                <OtpInputGroup>
                    <OtpInputSlot />
                    <OtpInputSlot />
                </OtpInputGroup>
                <OtpInputGroup>
                    <OtpInputSlot />
                    <OtpInputSlot />
                </OtpInputGroup>
            </OtpInput>
        );
    },
};