import React, {
    DialogHTMLAttributes,
    forwardRef,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";
import {cn} from "../../utils/cn";
import {DialogRef} from "@/components/dialog/Dialog";
import {Shortcut} from "@/components/shortcut/Shortcut";
import {Seperator} from "@/components/seperator/Seperator";
import {CornerDownLeft, MoveDown, MoveUp, Search} from "lucide-react";
import {Input} from "@/components/input/Input";
import {useHotkeys} from "react-hotkeys-hook";

interface CommandMenuProps extends DialogHTMLAttributes<HTMLDialogElement> {
    children: ReactNode;
}

interface CommandMenuItemProps {
    title: string;
    secondaryTitle?: string;
    icon?: ReactNode;
    onClick?: () => void;
    shortcut?: string;
    disabled?: boolean;
    selected?: boolean;
}

interface CommandMenuLabelProps {
    label: string;
}

const CommandMenuSeperator: React.FC = () => {
    return (
        <div className={"border-b border-zinc-300 dark:border-edge -mx-2"}/>
    );
}

const CommandMenuLabel: React.FC<CommandMenuLabelProps> = ({ label }) => {
    return (
        <span className={"px-2 text-sm text-zinc-400 dark:text-marcador"}>{label}</span>
    );
}

const CommandMenuItem: React.FC<CommandMenuItemProps> = ({ title, secondaryTitle, icon, shortcut, onClick, selected, disabled = false }) => {
    return (
        <div className={cn("w-full flex flex-row items-center justify-between px-4 py-2 " +
                "rounded-lg cursor-pointer hover:bg-zinc-200 dark:hover:bg-dark",
                selected ? "bg-zinc-200 dark:bg-dark" : ""
            )}
             onClick={onClick}
        >
            <div className={"w-max flex flex-row items-center space-x-2 text-zinc-800 dark:text-white text-md"}>
                {icon}
                <span>{title}</span>
                {secondaryTitle &&
                    <span className={"text-gray-500 dark:text-gray"}>{secondaryTitle}</span>
                }
            </div>
            {shortcut &&
                <Shortcut text={shortcut}/>
            }
        </div>
    );
}

const CommandMenu = forwardRef<DialogRef, CommandMenuProps>(({ children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [inputFocused, setInputFocused] = useState<boolean>(true);
    const dialogRef = useRef<DialogRef>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const getSelectableItems = () => {
        return React.Children.toArray(children).filter(
            (child) => React.isValidElement(child) && child.type === CommandMenuItem
        );
    }

    const itemCount = getSelectableItems().length;

    useHotkeys('esc', () => {
        dialogRef.current?.close()
        setIsOpen(false)
        setSelectedIndex(-1)
        setInputFocused(true)
    })

    useHotkeys('enter', () => {
        if (selectedIndex >= 0 && selectedIndex < itemCount) {
            const selectedItem = getSelectableItems()[selectedIndex] as React.ReactElement
            selectedItem.props.onClick?.()
            dialogRef.current?.close()
            setIsOpen(false)
            setSelectedIndex(-1)
            setInputFocused(true)
        }
    })

    useHotkeys('up', () => {
        if (isOpen) {
            if (inputFocused) {
                setInputFocused(false)
                setSelectedIndex(itemCount - 1)
            } else {
                setSelectedIndex((prev) => (prev <= 0 ? itemCount - 1 : prev - 1))
            }
        }
    })

    useHotkeys('down', () => {
        if (isOpen) {
            if (inputFocused) {
                setInputFocused(false)
                setSelectedIndex(0)
            } else {
                setSelectedIndex((prev) => (prev >= itemCount - 1 ? 0 : prev + 1))
            }
        }
    })

    useImperativeHandle(ref, () => ({
        show: () => {
            dialogRef.current?.showModal();
            inputRef.current?.focus();
            setSelectedIndex(-1);
            setInputFocused(true);
            setIsOpen(true);
        },
        close: () => {
            dialogRef.current?.close();
            setIsOpen(false);
            setSelectedIndex(-1);
            setInputFocused(true);
        },
        ...dialogRef.current,
    }));

    useEffect(() => {
        if (isOpen && inputFocused) {
            inputRef.current?.focus()
        }
    }, [isOpen, inputFocused])

    return (
        <div className={isOpen && "fixed inset-0 backdrop-blur-sm backdrop:bg-black/50"}>
            <dialog
                className={cn("group rounded-lg bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-edge")}
                style={{width: 760}}
                {...props}
                ref={dialogRef}
            >
                <div className={"flex flex-col"}>
                    <div className={"w-full flex flex-row items-center px-2 pt-2"}>
                        <Search size={18}
                                className={"text-zinc-400 dark:text-marcador ml-4 mr-2"}
                        />
                        <Input placeholder={"Search or type a command"}
                               border={"none"}
                               className={"w-full h-12 text-md m-0 mr-2 p-0 bg-zinc-100 dark:bg-black"}
                               onFocus={() => setInputFocused(true)}
                               onBlur={() => setInputFocused(false)}
                               ref={inputRef}
                        />
                    </div>
                    <Seperator/>
                    <div className={"flex flex-col space-y-2 p-2"}>
                        {React.Children.map(children, (child) => {
                            let commandItemIndex = 0;
                            if (React.isValidElement<CommandMenuItemProps>(child)) {
                                const currentIndex = commandItemIndex;
                                commandItemIndex++;
                                return React.cloneElement(child, {
                                    ...child.props,
                                    selected: currentIndex === selectedIndex,
                                });
                            }
                            return child;
                        })}
                    </div>
                    <Seperator/>
                    <div className={"flex flex-row items-center space-x-8 px-4 h-12 bg-zinc-200 dark:bg-dark text-zinc-500 dark:text-gray text-sm"}>
                        <div className={"flex flex-row items-center space-x-2"}>
                            <span>{"Close"}</span>
                            <Shortcut text={"ESC"}/>
                        </div>
                        <div className={"flex flex-row items-center space-x-2"}>
                            <span>{"Select"}</span>
                            <Shortcut>
                                <CornerDownLeft size={16}/>
                            </Shortcut>
                        </div>
                        <div className={"flex flex-row items-center space-x-1"}>
                            <span className={"mr-1"}>{"Navigate"}</span>
                            <Shortcut>
                                <MoveUp size={16}/>
                            </Shortcut>
                            <Shortcut>
                                <MoveDown size={16}/>
                            </Shortcut>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
});

export {
    CommandMenu,
    CommandMenuItem,
    CommandMenuLabel,
    CommandMenuSeperator
};