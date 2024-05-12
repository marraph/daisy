import React from 'react';
import {Dialog, DialogTitle, DialogDescription, showDialog, DialogContent} from './Dialog';
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

    const handleShowDialog = () => {
        if (dialogRef.current) {
            showDialog(dialogRef.current);
        }
    };

    return (
        <div>
            <button className={"bg-black text-white p-2 text-base rounded-lg border border-white border-opacity-20"} onClick={handleShowDialog}>Dialog</button>
            <Dialog className={"fixed"} ref={dialogRef}>
                <DialogContent>
                    <DialogTitle title="Titel bnla bla" />
                    <DialogDescription description="Beswmow iwwni gnowwnm wgm gowgwngnwgw mw om mwogmowg wfw" />
                    <Button text={"Button"}></Button>
                    <Input placeholder={"placeholder"}></Input>
                </DialogContent>
            </Dialog>
        </div>
    );
};