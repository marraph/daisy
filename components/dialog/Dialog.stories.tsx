import React, {useRef} from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogRef} from './Dialog';
import {Meta, StoryObj} from "@storybook/react";
import {Input} from '../input/Input';
import {Combobox, ComboboxItem} from "@/components/combobox/Combobox";

const meta: Meta<typeof Dialog> = {
    title: "Components/Dialog",
    component: Dialog,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default = () => {

    const dialogRef = useRef<DialogRef>(null);

    const fields = {
        name: {
            initialValue: '',
            validate: (value: string) => ({
                isValid: value.length >= 3,
                message: 'Name must be at least 3 characters'
            })
        },
        option: {
            initialValue: null,
            validate: (value: string) => ({
                isValid: value !== null,
                message: 'Invalid option'
            })
        }
    }

    const handleSubmit = (values: Record<string, any>) => {
        console.log('Submitted values:', values)
    }

    return (
        <>
            <Dialog ref={dialogRef} fields={fields} onSubmit={handleSubmit} width={800}>
                <DialogHeader title="User Information" description="Please enter your details" />
                <DialogContent>
                    {({ values, setValue }) => (
                        <div className="w-max space-y-2">
                            <Input
                                id="name"
                                placeholder={"Name"}
                                value={values.name}
                                onChange={(e) => setValue('name', e.target.value)}
                                validationRules={[fields.name.validate]}
                                showSuccess={true}

                            />
                            <Combobox
                                id={"option"}
                                buttonTitle={"Combobox"}
                                getItemTitle={(item: string) => item}
                                onValueChange={(value) => setValue('option', value)}
                            >
                                <ComboboxItem title={"Option 1"} value="Option 1" />
                                <ComboboxItem title={"Option 2"} value="Option 2" />
                            </Combobox>
                        </div>
                    )}
                </DialogContent>
                <DialogFooter saveButtonTitle={"Save"}/>
            </Dialog>

            <button className={"bg-black text-white p-2 text-base rounded-lg border border-edge"}
                    onClick={() => dialogRef?.current.show()}
                    type={"button"}
            >
                Dialog
            </button>
        </>
    );
};