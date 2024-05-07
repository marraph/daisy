import React from 'react';
import {ContextMenu, ContextMenuIcon, ContextMenuItem, ContextMenuSeperator} from './ContextMenu';
import {Meta, StoryObj} from "@storybook/react";
import {Archive} from "lucide-react";

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
        return (
            <ContextMenu>
                <ContextMenuItem title="Item 1">
                    <ContextMenuIcon icon={<Archive/>} />
                </ContextMenuItem>
                <ContextMenuSeperator />
                <ContextMenuItem title="Item 2" />
                <ContextMenuItem title="Item 3" />
            </ContextMenu>
        );
    },
};


