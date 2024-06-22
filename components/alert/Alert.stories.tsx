import {Alert, AlertTitle, AlertDescription, AlertIcon, AlertContent, AlertRef} from './Alert';
import {Meta, StoryObj} from "@storybook/react";
import React, {useRef} from "react";
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
        const alertRef = useRef<AlertRef>(null);

        return (
            <>
                <div className={"w-20 h-20 bg-error"} onClick={() => alertRef.current?.show()}></div>
                <Alert duration={3000} theme={"dark"} ref={alertRef} >
                    <AlertIcon icon={<Rocket size={30} className={"text-white"} />} />
                    <AlertContent>
                        <AlertTitle title="Alert" />
                        <AlertDescription description="This is an  lorem ipsum arma virumque." />
                    </AlertContent>
                </Alert>
            </>
        );
    },
};
