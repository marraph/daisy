"use client";

import React, {InputHTMLAttributes, ReactNode, useEffect, useRef, useState} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/utils/cn";

const input = cva("bg-zinc-100 dark:bg-black-light focus:outline-none text-center " +
    "border-r border-zinc-300 dark:border-edge focus-visible:outline-none focus-visible:ring-0 " +
    "text-zinc-700 dark:text-gray focus:text-zinc-800 dark:focus:text-white placeholder-zinc-500 dark:placeholder-marcador", {
    variants: {
        inputSize: {
            sm: "h-8 w-8",
            md: "h-12 w-12",
            lg: "h-16 w-16",
        },
    },
    defaultVariants: {
        inputSize: "md",
    }
});

interface OtpInputProps {
    label?: string
    children: ReactNode
    onComplete?: (otp: string) => void
}

interface OtpInputSlotProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {
    groupIndex?: number
    slotIndex?: number
}

interface OtpInputGroupProps {
    children: ReactNode
    groupIndex?: number
}

const OtpInputContext = React.createContext<{
    registerInput: (groupIndex: number, slotIndex: number, ref: HTMLInputElement | null) => void
    handleChange: (groupIndex: number, slotIndex: number, value: string) => void
    handleKeyDown: (groupIndex: number, slotIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => void
    getValue: (groupIndex: number, slotIndex: number) => string
} | null>(null)

const OtpInputSlot: React.FC<OtpInputSlotProps> = ({groupIndex, slotIndex, inputSize, ...props}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const context = React.useContext(OtpInputContext)

    if (!context) {
        throw new Error('OtpInputSlot must be used within an OtpInput')
    }

    const { registerInput, handleChange, handleKeyDown, getValue } = context

    useEffect(() => {
        registerInput(groupIndex, slotIndex, inputRef.current)
    }, [groupIndex, slotIndex, registerInput])

    return (
        <input
            type={"text"}
            size={1}
            maxLength={1}
            ref={inputRef}
            value={getValue(groupIndex, slotIndex)}
            onChange={(e) => handleChange(groupIndex, slotIndex, e.target.value)}
            onKeyDown={(e) => handleKeyDown(groupIndex, slotIndex, e)}
            className={cn(input({inputSize}))}
            {...props}
        />
    )
}

const OtpInputGroup: React.FC<OtpInputGroupProps> = ({ groupIndex, children }) => {
    return (
        <div className="w-max flex flex-row rounded-lg border border-zinc-300 dark:border-edge">
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<OtpInputSlotProps>(child)) {
                    return React.cloneElement(child, {
                        groupIndex: groupIndex,
                        slotIndex: index,
                    })
                }
                return child
            })}
        </div>
    )
}

const OtpInput: React.FC<OtpInputProps> = ({ label, children, onComplete }) => {
    const [otp, setOtp] = useState<string[][]>([])
    const inputRefs = useRef<(HTMLInputElement | null)[][]>([])

    useEffect(() => {
        const newOtp: string[][] = []
        const newInputRefs: (HTMLInputElement | null)[][] = []

        React.Children.forEach(children, (child) => {
            if (React.isValidElement<OtpInputGroupProps>(child)) {
                const slotCount = React.Children.count(child.props.children)
                newOtp.push(Array(slotCount).fill(''))
                newInputRefs.push(Array(slotCount).fill(null))
            }
        })

        setOtp(newOtp)
        inputRefs.current = newInputRefs
    }, [children])

    const registerInput = (groupIndex: number, slotIndex: number, ref: HTMLInputElement | null) => {
        if (!inputRefs.current[groupIndex]) {
            inputRefs.current[groupIndex] = []
        }
        inputRefs.current[groupIndex][slotIndex] = ref
    }

    const handleChange = (groupIndex: number, slotIndex: number, value: string) => {
        if (value.length <= 1) {
            setOtp(prevOtp => {
                const newOtp = [...prevOtp]
                if (!newOtp[groupIndex]) {
                    newOtp[groupIndex] = []
                }
                newOtp[groupIndex][slotIndex] = value
                return newOtp
            })

            if (value !== '') {
                focusNextInput(groupIndex, slotIndex)
            }

            // Check if OTP is complete after state update
            setTimeout(() => {
                if (isOtpComplete()) {
                    onComplete?.(otp.flat().join(''))
                }
            }, 0)
        }
    }

    const handleKeyDown = (groupIndex: number, slotIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && otp[groupIndex][slotIndex] === '') {
            focusPreviousInput(groupIndex, slotIndex)
        }
    }

    const focusNextInput = (groupIndex: number, slotIndex: number) => {
        const nextSlot = slotIndex + 1
        if (nextSlot < otp[groupIndex].length) {
            inputRefs.current[groupIndex][nextSlot]?.focus()
        } else if (groupIndex + 1 < otp.length) {
            inputRefs.current[groupIndex + 1][0]?.focus()
        }
    }

    const focusPreviousInput = (groupIndex: number, slotIndex: number) => {
        const prevSlot = slotIndex - 1
        if (prevSlot >= 0) {
            inputRefs.current[groupIndex][prevSlot]?.focus()
        } else if (groupIndex > 0) {
            const prevGroupLastIndex = otp[groupIndex - 1].length - 1
            inputRefs.current[groupIndex - 1][prevGroupLastIndex]?.focus()
        }
    }

    const isOtpComplete = () => {
        return otp.every(group => group.every(slot => slot !== ''))
    }

    const getValue = (groupIndex: number, slotIndex: number) => {
        return otp[groupIndex]?.[slotIndex] || ''
    }

    return (
        <OtpInputContext.Provider value={{ registerInput, handleChange, handleKeyDown, getValue }}>
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
                            })
                        }
                        return child;
                    })}
                </div>
            </div>
        </OtpInputContext.Provider>
    )
}

export { OtpInput, OtpInputGroup, OtpInputSlot }
