import React, {useRef, useState} from 'react';
import {Filter, FilterItem, FilterRef} from './Filter';
import {Meta, StoryObj} from "@storybook/react";
import {ShieldHalf} from "lucide-react";

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
        const filterRef = useRef<FilterRef>(null);
        const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string | null }>({});

        const handleFilterChange = (filters: { [key: string]: string | null }) => {
            setSelectedFilters(filters);
        }

        return (
            <>
                <Filter ref={filterRef} onFilterChange={handleFilterChange}>
                    <FilterItem title={"Team"} data={team} icon={<ShieldHalf size={16}/>}/>
                    <FilterItem title={"Project"} data={project}/>
                </Filter>
                <div className={"text-white"}>
                    <h2>Selected Filters:</h2>
                    <pre>{JSON.stringify(selectedFilters, null, 2)}</pre>
                </div>
            </>

    );
    },
};