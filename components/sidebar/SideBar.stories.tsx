import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Calendar, GitBranch, Wrench} from "lucide-react";
import {
    SideBar, SideBarCollapsible, SideBarContainer,
    SideBarItem,
    SideBarLabel,
    SideBarOrganisation,
    SideBarProfile,
    SideBarSeperator
} from "@/components/sidebar/SideBar";
import {Avatar} from "@/components/avatar/Avatar";

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
                <SideBarOrganisation organisationName={"marraph"} icon={<Avatar size={13}/>}/>

                <SideBarSeperator/>

                <SideBarContainer>
                    <SideBarLabel title={"Menu"}/>
                    <SideBarItem title={"Item1"} icon={<Wrench size={16}/>} isSelected={false}/>
                    <SideBarItem title={"Item2"} icon={<GitBranch size={16}/>} isSelected={false}/>
                    <SideBarItem title={"Item3"} icon={<Calendar size={16}/>} isSelected={false}/>
                </SideBarContainer>

                <SideBarCollapsible labelTitle={"Collapsible"} items={["Team 1", "Team 2", "Team 3"]}/>

                <SideBarProfile userName={"marius@ahsmus.com"}/>
            </SideBar>

        );
    },
};