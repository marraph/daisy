import {Alert, AlertRef} from './Alert';
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
                <div className={"w-20 h-20 bg-error"} onClick={() => alertRef.current?.show()}/>
                <Alert duration={3000}
                       closeButton={true}
                       ref={alertRef}
                       icon={<Rocket size={30} className={"text-white"}/>}
                       title={"This is a cool alert"}
                       description={"This is the alert description!"}
                />
            </>
        );
    },
};
