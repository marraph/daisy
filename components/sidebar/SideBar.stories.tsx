import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Wrench} from "lucide-react";
import {
    SideBar,
    SideBarItem,
    SideBarLabel,
    SideBarOrganisation,
    SideBarProfile,
    SideBarSeperator
} from "@/components/sidebar/SideBar";

const meta: Meta<typeof SideBar> = {
    title: "Components/SideBar",
    component: SideBar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
    render: () => {
        return (
            <SideBar>
                <SideBarOrganisation organisationName={"marraph"}/>

                <SideBarSeperator/>

                <SideBarLabel title={"Menu"}/>

                <SideBarItem title={"Item1"} icon={<Wrench size={16}/>} isSelected={false}/>
                <SideBarItem title={"Item2"} icon={<Wrench size={16}/>} isSelected={false}/>
                <SideBarItem title={"Item3"} icon={<Wrench size={16}/>} isSelected={false}/>

                <SideBarProfile userName={"mvriu5"}/>
            </SideBar>

        );
    },
};