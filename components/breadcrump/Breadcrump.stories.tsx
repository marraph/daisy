import React from 'react';
import {Breadcrump} from './Breadcrump';
import {Meta, StoryObj} from "@storybook/react";
import {useRouter} from "next/router";

const meta: Meta<typeof Breadcrump> = {
    title: "Components/Breadcrump",
    component: Breadcrump,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Breadcrump>

export const Default: Story = {
    render: () => {
        const router = useRouter();

        return (
            <Breadcrump pastText={"Home"}
                        nowText={"About"}
                        onClick={() => router.push('/home')}
            />
        );
    },
};