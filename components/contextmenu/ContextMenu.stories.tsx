import React from 'react';
import {
    ContextMenu,
    ContextMenuDropDownItem,
    ContextMenuHeader,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSelectItem,
    ContextMenuSeperator
} from './ContextMenu';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch, GitMerge, Trash2, User} from "lucide-react";
import {useOutsideClick} from "@/hooks/useOutsideClick";
import {useContextMenu} from "@/hooks/useContextMenu";
import {Avatar} from '../avatar/Avatar';

const meta: Meta<typeof ContextMenu> = {
    title: "Components/ContextMenu",
    component: ContextMenu,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
    render: () => {

        const { contextMenu, handleContextMenu, closeContextMenu, dropdownRef } = useContextMenu();

        const contextRef = useOutsideClick((e) => {
            if (!dropdownRef.current?.contains(e.target as Node)) {
                closeContextMenu();
            }
        });

        return (
            <div className={"h-[100vh] w-[100vw] bg-white overflow-hidden"} onContextMenu={(e) => handleContextMenu(e)}>

                {contextMenu.visible &&
                    <ContextMenu xPos={contextMenu.x} yPos={contextMenu.y} size={"medium"} ref={contextRef}>
                        <ContextMenuHeader title={"Branch #7"}
                                           description={"feat/chart-improvements"}
                                           icon={<GitBranch size={12}/>}
                        />
                        <ContextMenuLabel title={"Actions"}/>
                        <ContextMenuItem title="Merge" icon={<GitMerge size={14}/>} shortcut={"⌘ M"}/>
                        <ContextMenuItem title="Delete" icon={<Trash2 size={14}/>}/>
                        <ContextMenuSeperator/>
                        <ContextMenuSelectItem title={"Receive Notifications"}/>
                        <ContextMenuDropDownItem
                            title={"Add Reviewer"}
                            icon={<User size={14}/>}
                            dropdownRef={dropdownRef}
                            selectItems={[
                                { id: 1, title: "Josh", icon: <Avatar size={12}/>, selected: false },
                                { id: 2, title: "Sarah", icon: <Avatar size={12}/>, selected: false },
                                { id: 3, title: "Bruno", icon: <Avatar size={12}/>, selected: false },
                                { id: 4, title: "Raphael", icon: <Avatar size={12}/>, selected: false },
                                { id: 5, title: "Lisa", icon: <Avatar size={12}/>, selected: false }
                            ]}
                        />
                    </ContextMenu>
                }
            </div>

        );
    },
};


