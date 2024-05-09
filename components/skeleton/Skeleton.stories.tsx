import React from 'react';
import {Skeleton, SkeletonElement, SkeletonColumn} from './Skeleton';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Skeleton> = {
    title: "Components/Skeleton",
    component: Skeleton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
    render: () => {
        return (
            <Skeleton>
                <SkeletonElement width={100} height={100} />
                <SkeletonColumn>
                    <SkeletonElement width={300} height={40} />
                    <SkeletonElement width={400} height={30} />
                </SkeletonColumn>
            </Skeleton>
        );
    },
};