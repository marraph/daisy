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

    return (
        <>
            <Dialog ref={dialogRef} width={600}>
                <DialogHeader title={"Example Dialog"}
                              dialogRef={dialogRef}
                />
                <DialogContent className={"space-y-2"}>
                    <div className={"space-y-2"}>
                        <Button text={"Button"}></Button>
                        <Input placeholder={"Placeholder"}></Input>
                    </div>
                </DialogContent>
                <DialogFooter saveButtonTitle={"Save"}
                              cancelButton={true}
                              switchButton={false}
                              dialogRef={dialogRef}
                              disabledButton={false}
                />
            </Dialog>

            <button className={"bg-black text-white p-2 text-base rounded-lg border border-edge"}
                    onClick={() => dialogRef?.current.show()}>Dialog
            </button>

        </>
    );
};