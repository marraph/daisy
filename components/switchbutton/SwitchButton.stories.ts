import { SwitchButton } from './SwitchButton';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof SwitchButton> = {
    title: "Components/SwitchButton",
    component: SwitchButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        firstTitle: "ButtonOne",
        secondTitle:"ButtonTwo",
    },
};
