import React from 'react';
import {Breadcrumb} from './Breadcrumb';
import {Meta, StoryObj} from "@storybook/react";
import {useRouter} from "next/router";

const meta: Meta<typeof Breadcrumb> = {
    title: "Components/Breadcrumb",
    component: Breadcrumb,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
    render: () => {
        const router = useRouter();

        return (
            <Breadcrumb pastText={"Home"}
                        nowText={"About"}
                        onClick={() => router.push('/home')}
            />
        );
    },
};