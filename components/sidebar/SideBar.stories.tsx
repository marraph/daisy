import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Calendar, GitBranch, Wrench} from "lucide-react";
import {
    NavigationProvider,
    SideBar, SideBarCollapsible, SideBarCollapsibleItem, SideBarContainer,
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
            <NavigationProvider>
                <SideBar>
                    <SideBarSeperator/>
                    <SideBarOrganisation organisationName={"marraph"} icon={<Avatar size={13}/>}/>
                    <SideBarContainer>
                        <SideBarLabel title={"Menu"}/>
                        <SideBarItem title={"Item1"} icon={<Wrench size={16}/>} href={""}/>
                        <SideBarItem title={"Item2"} icon={<GitBranch size={16}/>} href={""}/>
                        <SideBarItem title={"Item3"} icon={<Calendar size={16}/>} href={""}/>
                        <div className={"py-1"}></div>
                        <SideBarCollapsible labelTitle={"Collapsible"}>
                            <SideBarCollapsibleItem title={"Team 1"}/>
                            <SideBarCollapsibleItem title={"Team 2"}/>
                            <SideBarCollapsibleItem title={"Team 3"}/>
                        </SideBarCollapsible>
                    </SideBarContainer>
                    <SideBarProfile userName={"marius@ahsmus.com"}/>
                </SideBar>
            </NavigationProvider>
        );
    }
}