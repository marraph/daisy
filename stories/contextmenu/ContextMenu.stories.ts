import {ContextMenu, ContextMenuItem} from './ContextMenu';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof ContextMenu> = {
    title: "Components/ContextMenu",
    component: ContextMenu,
    subcomponents: { ContextMenuItem },
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        theme: {
            options: ["dark", "success", "warning", "error"],
        },
    },
    }
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default = () => <ContextMenu>
    <ContextMenuItem title="Item 1" />
    <ContextMenuItem title="Item 2" />
    <ContextMenuItem title="Item 3" />
}