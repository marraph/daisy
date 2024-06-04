import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CloseButton } from "./CloseButton";

const meta: Meta<typeof CloseButton> = {
  title: "Components/CloseButton",
  component: CloseButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CloseButton>;

export const Default: Story = {
  render: () => {
    return <CloseButton></CloseButton>;
  },
};
