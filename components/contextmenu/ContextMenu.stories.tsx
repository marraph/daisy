import React from 'react';
import {
    ContextMenu,
    ContextMenuDropDownItem,
    ContextMenuFooter,
    ContextMenuHeader,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSelectItem,
    ContextMenuSeperator
} from './ContextMenu';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch, Wrench} from "lucide-react";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {useContextMenu} from '../../hooks/useContextMenu';

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
            <div className={"h-screen w-screen bg-red-500"} onContextMenu={(e) => handleContextMenu(e)}>

                {contextMenu.visible &&
                    <ContextMenu xPos={contextMenu.x} yPos={contextMenu.y} size={"medium"} ref={contextRef}>
                        <ContextMenuHeader title={"Context Menu"}
                                           description={"This is a context menu"}
                                           icon={<div className={"size-4 rounded-md bg-amber-500"}/>}
                        />
                        <ContextMenuItem title="Item 1"
                                         icon={<GitBranch size={14}/>}
                        />
                        <ContextMenuSeperator/>
                        <ContextMenuLabel title={"Label"}/>
                        <ContextMenuItem title="Item 2"/>
                        <ContextMenuItem title="Item 3" shortcut={"⌘S"}/>
                        <ContextMenuSeperator/>
                        <ContextMenuSelectItem title={"You can select me"}/>
                        <ContextMenuDropDownItem
                            title={"DropDown"}
                            dropdownRef={dropdownRef}
                            selectItems={[
                                { id: 1, title: "Item 1", icon: <GitBranch size={14}/>, selected: false },
                                { id: 2, title: "Item 2", icon: <GitBranch size={14}/>, selected: false },
                                { id: 3, title: "Item 3", icon: <GitBranch size={14}/>, selected: false }
                            ]}
                        />
                        <ContextMenuFooter title={"Footer"}
                                           icon={<Wrench size={12}/>}
                        />
                    </ContextMenu>
                }
            </div>

        );
    },
};


