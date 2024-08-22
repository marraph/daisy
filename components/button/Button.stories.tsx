import React, {useState} from 'react';
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
        const [isLoading, setIsLoading] = useState(false);

        const handleSave = async () => {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.error('Error saving data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div className={"flex flex-col space-y-2"}>

                <div className={"flex flex-row space-x-2"}>

                    <Button theme={"primary"}
                            size={"medium"}
                            text={"Primary"}
                            icon={<Wallet size={20}/>}
                            onClick={handleSave}
                            isLoading={isLoading}
                    />
                </div>
                <div className={"flex flex-row space-x-2"}>
                    <Button theme={"default"}
                            size={"small"}
                            text={"Default"}
                            icon={<Wallet size={16}/>}
                            onClick={handleSave}
                            isLoading={isLoading}
                    />
                    <Button theme={"primary"}
                            size={"small"}
                            text={"Primary"}
                            icon={<Wallet size={16}/>}
                            onClick={handleSave}
                            isLoading={isLoading}
                    />
                </div>
            </div>
        );
    },
};


