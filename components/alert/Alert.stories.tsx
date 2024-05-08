import {Alert, AlertTitle, AlertDescription, AlertIcon, AlertContent} from './Alert';
import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Rocket} from "lucide-react";

const meta: Meta<typeof Alert> = {
    title: "Components/Alert",
    component: Alert,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Alert>

export const Default: Story = {
    render: () => {
        return (
            <Alert theme={"dark"} border={"default"} opacity={"none"}>
                <AlertIcon icon={<Rocket size={30} className={"text-white"} />} />
                <AlertContent>
                    <AlertTitle title="Alert" />
                    <AlertDescription description="This is an  lorem ipsum arma virumque." />
                </AlertContent>
            </Alert>
        );
    },
};
