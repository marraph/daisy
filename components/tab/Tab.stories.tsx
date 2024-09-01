import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Tab, TabHeader} from "@/components/tab/Tab";

const meta: Meta<typeof TabHeader> = {
    title: "Components/TabHeader",
    component: TabHeader,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TabHeader>

export const Default: Story = {
    render: () => {
        return (
            <TabHeader titles={["Tab 1", "Tab 2", "Tab 3"]}>
                <Tab>
                    <button type={"button"}>hallo</button>
                </Tab>
                <Tab>
                    <button type={"button"}>2</button>
                </Tab>
                <Tab>
                    <button type={"button"}>button</button>
                </Tab>
            </TabHeader>
        );
    },
};