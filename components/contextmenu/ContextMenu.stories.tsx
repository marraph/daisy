import React from 'react';
import {ContextMenu, ContextMenuContainer, ContextMenuItem} from './ContextMenu';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch} from "lucide-react";
import {Seperator} from "../seperator/Seperator";

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

        const selectItems = [
            { id: 1, title: "Item 1", icon: <GitBranch size={14}/>, selected: false },
            { id: 2, title: "Item 2", icon: <GitBranch size={14}/>, selected: true },
            { id: 3, title: "Item 3", icon: <GitBranch size={14}/>, selected: false },
        ];

        return (
            <ContextMenu>
                <ContextMenuContainer>
                    <ContextMenuItem title="Item 1"
                                     icon={<GitBranch size={14}/>}
                                     selectItems={selectItems}
                                     onItemClick={(item) => console.log(item)}
                    />
                </ContextMenuContainer>

                <Seperator/>
                <ContextMenuContainer>
                    <ContextMenuItem title="Item 2"/>
                    <ContextMenuItem title="Item 3" shortcut={"⌘S"}/>
                </ContextMenuContainer>
            </ContextMenu>
        );
    },
};


