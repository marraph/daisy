import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Calendar, CircleDashed, GitBranch, Wrench} from "lucide-react";
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
                    <SideBarOrganisation organisationName={"Acme Inc."} icon={<Avatar size={13}/>}/>
                    <SideBarContainer>
                        <SideBarLabel title={"Menu"}/>
                        <SideBarItem title={"Issues"} icon={<CircleDashed size={16}/>} href={""}/>
                        <SideBarItem title={"Branches"} icon={<GitBranch size={16}/>} href={""}/>
                        <SideBarItem title={"Calendar"} icon={<Calendar size={16}/>} href={""}/>
                        <div className={"py-1"}></div>
                        <SideBarCollapsible labelTitle={"Teams"}>
                            <SideBarCollapsibleItem title={"Development"}/>
                            <SideBarCollapsibleItem title={"Support"}/>
                            <SideBarCollapsibleItem title={"HR-Management"}/>
                        </SideBarCollapsible>
                    </SideBarContainer>
                    <SideBarProfile userName={"admin@calla.so"}/>
                </SideBar>
            </NavigationProvider>
        );
    }
}