import { Button } from './Button';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    children: "Button",
    theme: "dark",
    size: "small",
    border: "default",
    scaling: "default",
  },
};

export const Medium: Story = {
  args: {
    children: "Button",
    theme: "dark",
    size: "medium",
    border: "default",
    scaling: "default",
  },
};

export const Large: Story = {
  args: {
    children: "Button",
    theme: "dark",
    size: "large",
    border: "default",
    scaling: "default",
  },
};

export const Ghost: Story = {
  args: {
    children: "Button",
    theme: "ghost",
    size: "large",
    border: "none",
    scaling: "default",
  },
};

export const Primary: Story = {
  args: {
    children: "Button",
    theme: "primary",
    size: "medium",
    border: "default",
    scaling: "default",
  },
};

export const White: Story = {
  args: {
    children: "Button",
    theme: "white",
    size: "medium",
    border: "default",
    scaling: "default",
  },
};


