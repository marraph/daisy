import React, {useRef} from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogRef} from './Dialog';
import {Meta, StoryObj} from "@storybook/react";
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import {SwitchRef} from "../switch/Switch";

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
    const switchRef = useRef<SwitchRef>(null);

    return (
        <>
            <button className={"bg-black text-white p-2 text-base rounded-lg border border-white border-opacity-20"} onClick={() => dialogRef?.current.show()}>Dialog</button>
            <Dialog ref={dialogRef} width={600}>
                <DialogHeader title={"Create Task Dialog"}
                              dialogRef={dialogRef}
                />
                <DialogContent>
                    <Button text={"Button"}></Button>
                    <Input placeholder={"placeholder"}></Input>
                </DialogContent>
                <DialogFooter saveButtonTitle={"Save"}
                              cancelButton={true}
                              switchButton={false}
                              dialogRef={dialogRef}
                />
            </Dialog>
        </>
    );
};