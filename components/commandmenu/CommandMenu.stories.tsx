import React, {useRef} from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Input} from '../input/Input';
import {
    CommandMenu,
    CommandMenuItem,
    CommandMenuLabel,
    CommandMenuSeperator
} from "@/components/commandmenu/CommandMenu";
import {DialogRef} from "@/components/dialog/Dialog";
import {Box, CalendarFold, CircleDashed, FilePenLine, GitBranch, LayoutDashboard, Mail} from "lucide-react";

const meta: Meta<typeof CommandMenu> = {
    title: "Components/CommandMenu",
    component: CommandMenu,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CommandMenu>;

export const Default = () => {

    const dialogRef = useRef<DialogRef>(null);

    return (
        <>
            <CommandMenu ref={dialogRef}>
                <CommandMenuLabel title={"Quick Actions"}/>
                <CommandMenuItem title={"Open issue"} icon={<CircleDashed size={16}/>} shortcut={"⌘ T"}/>
                <CommandMenuItem title={"Create appointment"} icon={<CalendarFold size={16}/>} shortcut={"⌘ A"}/>
                <CommandMenuItem title={"Invite a new user"} icon={<Mail size={16}/>} shortcut={"⌘ I"}/>
                <CommandMenuSeperator/>
                <CommandMenuLabel title={"Recent"}/>
                <CommandMenuItem title={"Edit Task: "} icon={<FilePenLine size={16}/>} secondaryTitle={"Improve performance"}/>
                <CommandMenuItem title={"Dashboard"} icon={<LayoutDashboard size={16}/>} secondaryTitle={"Go to your dashboard"}/>
                <CommandMenuItem title={"Projects"} icon={<Box size={16}/>} secondaryTitle={"View your active projects"}/>

            </CommandMenu>

            <button className={"bg-black text-white p-2 text-base rounded-lg border border-edge"}
                    onClick={() => dialogRef?.current.show()}
                    type={"button"}
            >
                Dialog
            </button>
        </>
    );
};