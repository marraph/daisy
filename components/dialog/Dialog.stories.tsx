import React from 'react';
import {Dialog, DialogSeperator} from './Dialog';
import {Meta, StoryObj} from "@storybook/react";
import { Button } from '../button/Button';
import { Input } from '../input/Input';

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

export const Default = () => {
    let dialogRef = React.useRef<HTMLDialogElement>(null);

    return (
        <>
            <button className={"bg-black text-white p-2 text-base rounded-lg border border-white border-opacity-20"} onClick={dialogRef.current?.showModal}>Dialog</button>
            <Dialog className={"fixed"} ref={dialogRef}>
                <Button text={"Button"}></Button>
                <Input placeholder={"placeholder"}></Input>
                <DialogSeperator />
                <Button text={"Button"}></Button>
                <Input placeholder={"placeholder"}></Input>
            </Dialog>
        </>
    );
};