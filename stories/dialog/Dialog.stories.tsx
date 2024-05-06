import React from 'react';
import {Dialog, DialogTitle, DialogDescription } from './Dialog';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Dialog> = {
    title: "Components/Dialog",
    component: Dialog,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dialog>;

function showDialog() {
    const dialog = document.querySelector("dialog");
    if (dialog) {
        dialog.showModal();
    }
}

export const Default: Story = {
    render: () => {
        return (
            <Dialog>
                <DialogTitle title="This is a Dialog" />
                <DialogDescription description="oiwifwfhwfnhw nfiwfnwifnwifnwfwfw noiw ghfw on nnwiog noigwgog wiogawiogjgiwgi wawgio giowagiwg jwg hwgwog jwaogjwao gjwogjwojgowjgwajgj ogwaj gowajgowgjwaogja" />
            </Dialog>
        );
    },
};