import React from 'react';
import {Filter, FilterItem} from './Filter';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Filter> = {
    title: "Components/Filter",
    component: Filter,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Filter>;

const team = ["team 1", "team 2", "team 3"];
const project = ["project 1", "project 2", "project 3"];

export const Default: Story = {
    render: () => {
        return (
            <Filter>
                <FilterItem title={"Team"} data={team}/>
                <FilterItem title={"Project"} data={project}/>
            </Filter>
        );
    },
};