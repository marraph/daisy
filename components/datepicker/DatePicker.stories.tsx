import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {DatePicker} from "./DatePicker";
import {Button} from "../button/Button";
import {Combobox, ComboboxItem} from "../combobox/Combobox";

const meta: Meta<typeof DatePicker> = {
    title: "Components/DatePicker",
    component: DatePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
    render: () => {
        return (
            <div className={"flex flex-col space-x-2"}>
                <Combobox buttonTitle={"gwgw"}>
                    <ComboboxItem title={"Item 1"}></ComboboxItem>
                    <ComboboxItem title={"Item 2"}></ComboboxItem>
                    <ComboboxItem title={"Item 3"}></ComboboxItem>
                </Combobox>
                <DatePicker text={"Select a date"}
                            size={"small"}
                            dayFormat={"long"}
                            closeButton={true}
                            onValueChange={(value) => console.log(value)}
                            label={"Datum"}
                />
            </div>
        );
    },
};