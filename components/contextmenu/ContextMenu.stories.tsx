import React, {useCallback, useState} from 'react';
import {ContextMenu, ContextMenuContainer, ContextMenuItem} from './ContextMenu';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch} from "lucide-react";
import {Seperator} from "../seperator/Seperator";
import {useOutsideClick} from "@/hooks/useOutsideCliick";

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

        const [contextMenu, setContextMenu] = useState({ x: 0, y: 0, visible: false });

        const handleContextMenu = useCallback((e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.target instanceof HTMLButtonElement || e.target instanceof SVGElement) {
                const buttonElement = e.currentTarget;
                const rect = buttonElement.getBoundingClientRect();

                const coordinates = {
                    x: rect.left - 52,
                    y: rect.top + 34
                };
                setContextMenu({ x: coordinates.x, y: coordinates.y, visible: true });
            } else {
                setContextMenu({ x: e.clientX, y: e.clientY, visible: true });
            }
        }, []);

        const contextRef = useOutsideClick(() => {
            setContextMenu({ x: 0, y: 0, visible: false });
        });

        return (
            <div className={"h-screen w-screen bg-red-500"} onContextMenu={(e) => handleContextMenu(e)}>

                {contextMenu.visible &&
                    <ContextMenu xPos={contextMenu.x} yPos={contextMenu.y} ref={contextRef}>
                        <ContextMenuContainer>
                            <ContextMenuItem title="Item 1"
                                             icon={<GitBranch size={14}/>}
                            />
                        </ContextMenuContainer>
                        <Seperator/>
                        <ContextMenuContainer>
                            <ContextMenuItem title="Item 2"/>
                            <ContextMenuItem title="Item 3" shortcut={"⌘S"}/>
                        </ContextMenuContainer>
                    </ContextMenu>
                }
            </div>

        );
    },
};


