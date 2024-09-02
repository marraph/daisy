"use client";

import React, {InputHTMLAttributes, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/utils/cn";

const input = cva("bg-zinc-100 dark:bg-black-light focus:outline-none text-center border-r " +
    "border-r border-zinc-300 dark:border-edge focus-visible:outline-none focus-visible:ring-0 " +
    "text-zinc-700 dark:text-gray focus:text-zinc-800 dark:focus:text-white placeholder-zinc-500 dark:placeholder-marcador", {
    variants: {
        inputSize: {
            sm: "h-8 w-8 text-xs",
            md: "h-12 w-12 text-md",
            lg: "h-16 w-16 text-xl",
        },
    },
    defaultVariants: {
        inputSize: "md",
    }
});

interface OtpInputProps {
    label?: string;
    expectedValue?: string;
    errorMessage?: string;
    children: ReactNode;
    onComplete?: (otp: string) => void;
    size?: "sm" | "md" | "lg";
}

interface OtpInputSlotProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {
    groupIndex?: number;
    slotIndex?: number;
    groupSlotCount?: number;
}

interface OtpInputGroupProps {
    children: ReactNode;
    groupIndex?: number;
    size?: "sm" | "md" | "lg";
}

const OtpInputContext = React.createContext<{
    registerInput: (groupIndex: number, slotIndex: number, ref: HTMLInputElement | null) => void,
    handleChange: (groupIndex: number, slotIndex: number, value: string) => void,
    handleKeyDown: (groupIndex: number, slotIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => void,
    getValue: (groupIndex: number, slotIndex: number) => string,
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void
} | null>(null);

const OtpInputSlot: React.FC<OtpInputSlotProps> = ({groupIndex, slotIndex, groupSlotCount, inputSize, ...props}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const context = useContext(OtpInputContext);

    if (!context) {
        throw new Error('OtpInputSlot must be used within an OtpInput');
    }

    const { registerInput, handleChange, handleKeyDown, getValue, handlePaste } = context;

    useEffect(() => {
        registerInput(groupIndex, slotIndex, inputRef.current);
    }, [groupIndex, slotIndex, registerInput]);

    return (
        <input
            type={"text"}
            size={1}
            maxLength={1}
            ref={inputRef}
            value={getValue(groupIndex, slotIndex)}
            onChange={(e) => handleChange(groupIndex, slotIndex, e.target.value)}
            onKeyDown={(e) => handleKeyDown(groupIndex, slotIndex, e)}
            onPaste={handlePaste}
            className={cn(input({inputSize}),
                slotIndex === 0 ? "rounded-l-lg" : "",
                slotIndex === groupSlotCount - 1 ? "rounded-r-lg border-none" : "",
            )}
            {...props}
        />
    );
}

const OtpInputGroup: React.FC<OtpInputGroupProps> = ({ size, groupIndex, children }) => {
    return (
        <div className="w-max flex flex-row rounded-lg border border-zinc-300 dark:border-edge">
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<OtpInputSlotProps>(child)) {
                    return React.cloneElement(child, {
                        groupIndex: groupIndex,
                        slotIndex: index,
                        groupSlotCount: React.Children.count(children),
                        inputSize: size
                    })
                }
                return child
            })}
        </div>
    );
}

const OtpInput: React.FC<OtpInputProps> = ({ label, children, onComplete, size, expectedValue, errorMessage }) => {
    const [otp, setOtp] = useState<string[][]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

    useEffect(() => {
        const newOtp: string[][] = [];
        const newInputRefs: (HTMLInputElement | null)[][] = [];

        React.Children.forEach(children, (child) => {
            if (React.isValidElement<OtpInputGroupProps>(child)) {
                const slotCount = React.Children.count(child.props.children);
                newOtp.push(Array(slotCount).fill(''));
                newInputRefs.push(Array(slotCount).fill(null));
            }
        });

        setOtp(newOtp);
        inputRefs.current = newInputRefs;
    }, [children])

    const registerInput = (groupIndex: number, slotIndex: number, ref: HTMLInputElement | null) => {
        if (!inputRefs.current[groupIndex]) {
            inputRefs.current[groupIndex] = [];
        }
        inputRefs.current[groupIndex][slotIndex] = ref;
    }

    const handleChange = (groupIndex: number, slotIndex: number, value: string) => {
        if (value.length <= 1) {
            setOtp(prevOtp => {
                const newOtp = [...prevOtp];
                if (!newOtp[groupIndex]) {
                    newOtp[groupIndex] = [];
                }
                newOtp[groupIndex][slotIndex] = value;
                return newOtp;
            });

            if (value !== '') {
                focusNextInput(groupIndex, slotIndex);
            }

            setTimeout(() => {
                const complete = isOtpComplete();
                setIsComplete(complete);
                if (complete) {
                    onComplete?.(otp.flat().join(''));
                    inputRefs.current[groupIndex][slotIndex]?.blur();
                }
            }, 0);
        }
    }

    const handleKeyDown = (groupIndex: number, slotIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && otp[groupIndex][slotIndex] === '') {
            focusPreviousInput(groupIndex, slotIndex);
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const pastedChars = pastedData.split('');

        let currentGroupIndex = 0;
        let currentSlotIndex = 0;

        for (const char of pastedChars) {
            if (currentGroupIndex < otp.length) {
                if (currentSlotIndex < otp[currentGroupIndex].length) {
                    handleChange(currentGroupIndex, currentSlotIndex, char);
                    currentSlotIndex++;
                }
                if (currentSlotIndex >= otp[currentGroupIndex].length) {
                    currentGroupIndex++;
                    currentSlotIndex = 0;
                }
            } else {
                break;
            }
        }

        setTimeout(() => {
            const complete = isOtpComplete();
            setIsComplete(complete);
            if (complete) {
                onComplete?.(otp.flat().join(''));
                const activeElement = document.activeElement as HTMLElement;
                activeElement?.blur();
            }
        }, 0);
    }

    const focusNextInput = (groupIndex: number, slotIndex: number) => {
        const nextSlot = slotIndex + 1;
        if (nextSlot < otp[groupIndex].length) {
            inputRefs.current[groupIndex][nextSlot]?.focus();
        } else if (groupIndex + 1 < otp.length) {
            inputRefs.current[groupIndex + 1][0]?.focus();
        }
    }

    const focusPreviousInput = (groupIndex: number, slotIndex: number) => {
        const prevSlot = slotIndex - 1;
        if (prevSlot >= 0) {
            inputRefs.current[groupIndex][prevSlot]?.focus();
        } else if (groupIndex > 0) {
            const prevGroupLastIndex = otp[groupIndex - 1].length - 1;
            inputRefs.current[groupIndex - 1][prevGroupLastIndex]?.focus();
        }
    }

    const isOtpComplete = () => {
        return otp.every(group => group.every(slot => slot !== ''));
    }

    const getValue = (groupIndex: number, slotIndex: number) => {
        return otp[groupIndex]?.[slotIndex] || '';
    }

    return (
        <OtpInputContext.Provider value={{ registerInput, handleChange, handleKeyDown, getValue, handlePaste }}>
            <div className="flex flex-col space-y-1">
                {label && (
                    <span className="ml-1 text-zinc-400 dark:text-marcador text-xs">{label}</span>
                )}
                <div className="w-max flex flex-row space-x-2">
                    {React.Children.map(children, (child, index) => {
                        if (React.isValidElement<OtpInputGroupProps>(child)) {
                            return React.cloneElement(child, {
                                key: index,
                                groupIndex: index,
                                size: size
                            })
                        }
                        return child;
                    })}
                </div>
                {isComplete && errorMessage && expectedValue !== otp.flat().join('') &&
                    <span className={"ml-1 text-sm text-error"}>{errorMessage}</span>
                }
            </div>
        </OtpInputContext.Provider>
    );
}

export {
    OtpInput,
    OtpInputGroup,
    OtpInputSlot
};
