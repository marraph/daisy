import React, {useRef, useState} from 'react';
import {Dialog, DialogRef} from './Dialog';
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

    const dialogRef = useRef<DialogRef>(null);

    return (
        <>
            <button className={"bg-black text-white p-2 text-base rounded-lg border border-white border-opacity-20"} onClick={() => dialogRef?.current.show()}>Dialog</button>
            <Dialog ref={dialogRef}>
                <Button text={"Button"}></Button>
                <Input placeholder={"placeholder"}></Input>
                <Button text={"Button"}></Button>
                <Input placeholder={"placeholder"}></Input>
            </Dialog>
        </>
    );
};