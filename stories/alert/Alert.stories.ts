import { Alert } from './Alert';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Alert> = {
    title: "Components/Alert",
    component: Alert,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Small: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "small",
    },
};

export const Medium: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "medium",
    },
};

export const Large: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "large",
    },
};

export const Success: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "success",
        size: "medium",
    },
};

export const Warning: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "warning",
        size: "medium",
    },
};

export const Error: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "error",
        size: "medium",
    },
};

export const IconAlert: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "medium",
        icon_url: "M15,3c-6.627,0 -12,5.373 -12,12c0,5.623 3.872,10.328 9.092,11.63c-0.056,-0.162 -0.092,-0.35 -0.092,-0.583v-2.051c-0.487,0 -1.303,0 -1.508,0c-0.821,0 -1.551,-0.353 -1.905,-1.009c-0.393,-0.729 -0.461,-1.844 -1.435,-2.526c-0.289,-0.227 -0.069,-0.486 0.264,-0.451c0.615,0.174 1.125,0.596 1.605,1.222c0.478,0.627 0.703,0.769 1.596,0.769c0.433,0 1.081,-0.025 1.691,-0.121c0.328,-0.833 0.895,-1.6 1.588,-1.962c-3.996,-0.411 -5.903,-2.399 -5.903,-5.098c0,-1.162 0.495,-2.286 1.336,-3.233c-0.276,-0.94 -0.623,-2.857 0.106,-3.587c1.798,0 2.885,1.166 3.146,1.481c0.896,-0.307 1.88,-0.481 2.914,-0.481c1.036,0 2.024,0.174 2.922,0.483c0.258,-0.313 1.346,-1.483 3.148,-1.483c0.732,0.731 0.381,2.656 0.102,3.594c0.836,0.945 1.328,2.066 1.328,3.226c0,2.697 -1.904,4.684 -5.894,5.097c1.098,0.573 1.899,2.183 1.899,3.396v2.734c0,0.104 -0.023,0.179 -0.035,0.268c4.676,-1.639 8.035,-6.079 8.035,-11.315c0,-6.627 -5.373,-12 -12,-12z",
    },
};