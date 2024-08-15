import React, {useRef} from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogRef} from './Dialog';
import {Meta, StoryObj} from "@storybook/react";
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import {Switch, SwitchRef} from "../switch/Switch";

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
                />
                <DialogContent className={"space-y-2"}>
                    <div className={"space-y-2"}>
                        <Button text={"Button"}></Button>
                        <Input placeholder={"Placeholder"}></Input>
                    </div>
                </DialogContent>
                <DialogFooter saveButtonTitle={"Save"}
                              disabledButton={false}
                >
                    <div className={"flex flex-row items-center space-x-2 text-zinc-700 dark:text-gray text-xs mr-16"}>
                        <span>{"Create more"}</span>
                        <Switch/>
                    </div>
                </DialogFooter>
            </Dialog>

            <button className={"bg-black text-white p-2 text-base rounded-lg border border-edge"}
                    onClick={() => dialogRef?.current.show()}>Dialog
            </button>

        </>
);
};