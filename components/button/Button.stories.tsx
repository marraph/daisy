import React from 'react';
import {Button} from './Button';
import {Meta, StoryObj} from "@storybook/react";
import {Wallet} from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>

export const Default: Story = {
    render: () => {
        return (
            <div className={"flex flex-row space-x-2"}>
                <Button theme={"default"}
                        size={"medium"}
                        text={"Default"}
                        icon={<Wallet size={20} className={"mr-3"}/>}
                />
                <Button theme={"primary"}
                        size={"medium"}
                        text={"Primary"}
                        icon={<Wallet size={20} className={"mr-3"}/>}
                />
                <Button theme={"default"}
                        disabled={true}
                        size={"medium"}
                        text={"Default Disabled"}
                        icon={<Wallet size={20} className={"mr-3"}/>}
                />
                <Button theme={"primary"}
                        disabled={true}
                        size={"medium"}
                        text={"Primary Disabled"}
                        icon={<Wallet size={20} className={"mr-3"}/>}
                />
            </div>
        );
    },
};


