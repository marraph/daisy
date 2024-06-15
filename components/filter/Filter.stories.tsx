import React, { useRef, useState } from "react";
import {FilterButton, FilterItem, FilterRef} from "./Filter";
import { Meta, StoryObj } from "@storybook/react";
import { ShieldHalf } from "lucide-react";

const meta: Meta<typeof FilterButton> = {
  title: "Components/Filter",
  component: FilterButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FilterButton>;

const team = []
const project = ["project 1", "project 2", "project 3", "project marius uowgigwg w wg"];

export const Default: Story = {
  render: () => {
    const filterRef = useRef<FilterRef>(null);
    const [selectedFilters, setSelectedFilters] = useState<{
      [key: string]: string | null;
    }>({});

    const handleFilterChange = (filters: { [key: string]: string | null }) => {
      setSelectedFilters(filters);
    };

    return (
      <FilterButton ref={filterRef} onFilterChange={handleFilterChange}>
        <FilterItem
          title={"Team"}
          data={team}
          icon={<ShieldHalf size={16} />}
        />
        <FilterItem title={"Project"} data={project} icon={<ShieldHalf size={16} />}/>
      </FilterButton>
    );
  },
};
