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
import {useOutsideClick} from "@/hooks/useOutsideClick";
import {AnimatePresence, motion} from "framer-motion";

interface CommandMenuProps extends DialogHTMLAttributes<HTMLDialogElement> {
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    animation: "slide" | "fade";
}

interface CommandMenuItemProps {
    title: string;
    secondaryTitle?: string;
    icon?: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
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

const CommandMenu = forwardRef<DialogRef, CommandMenuProps>(({ isOpen, onClose, children, animation = "fade", ...props }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [inputFocused, setInputFocused] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const menuRef = useOutsideClick(() => handleClose());

    const getSelectableItems = () => {
        return React.Children.toArray(children).filter(
            (child) => React.isValidElement(child) && child.type === CommandMenuItem
        );
    }

    const itemCount = getSelectableItems().length;

    const handleClose = () => {
        setSelectedIndex(-1);
        setInputFocused(true);
        onClose?.();
    }


    useHotkeys('esc', () => {
        handleClose();
    })

    useHotkeys('enter', (e) => {
        if (selectedIndex >= 0 && selectedIndex < itemCount) {
            const selectedItem = getSelectableItems()[selectedIndex] as React.ReactElement;
            e.preventDefault();
            e.stopPropagation();
            selectedItem.props.onClick?.();
            handleClose();
        }
    })

    useHotkeys('up', () => {
        if (isOpen) {
            setInputFocused(false)
            setSelectedIndex((prev) => (prev <= 0 ? itemCount - 1 : prev - 1))
        }
    })

    useHotkeys('down', () => {
        if (isOpen) {
            setInputFocused(false)
            setSelectedIndex((prev) => (prev >= itemCount - 1 ? 0 : prev + 1))
        }
    })

    useEffect(() => {
        if (isOpen && inputFocused) {
            inputRef.current?.focus()
        }
    }, [isOpen, inputFocused])

    return (
        <AnimatePresence>
            {isOpen &&
                <motion.div
                    className={isOpen && "fixed inset-0 flex items-center justify-center backdrop-blur-sm backdrop:bg-black/50"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={animation === "fade" ? {scale: 0.7, opacity: 0} : { y: "50%", opacity: 0 }}
                        animate={animation === "fade" ? {scale: 1, opacity: 1} : { y: 0, opacity: 1 }}
                        exit={ animation === "fade" ? {scale: 0.7, opacity: 0} : { y: "50%", opacity: 0 }}
                        transition={{type: "spring", damping: 25, stiffness: 300}}
                        className={cn("w-[760px] rounded-lg bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-edge")}
                        role="dialog"
                        aria-modal="true"
                        ref={menuRef}
                        onClick={(e) => e.stopPropagation()}
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
                                {(() => {
                                    let itemIndex = -1;
                                    return React.Children.map(children, (child) => {
                                        if (React.isValidElement<CommandMenuItemProps>(child) && child.type === CommandMenuItem) {
                                            itemIndex++;
                                            return React.cloneElement(child, {
                                                ...child.props,
                                                selected: itemIndex === selectedIndex,
                                                onClick: (e: React.MouseEvent) => {
                                                    child.props.onClick?.(e);
                                                    handleClose();
                                                }
                                            });
                                        }
                                        return child;
                                    });
                                })()}
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
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    );
});

export {
    CommandMenu,
    CommandMenuItem,
    CommandMenuLabel,
    CommandMenuSeperator
};