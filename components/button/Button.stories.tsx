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
        <Button theme={"dark"} text={"Button"}>
          <Wallet size={20} className={"mr-3"}/>
        </Button>
    );
  },
};


