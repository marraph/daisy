import React, {ReactNode, useState} from "react";
import {cn} from "@/utils/cn";
import {ChevronDown, ChevronRight, ChevronsUpDown, Plus} from "lucide-react";
import {Skeleton, SkeletonColumn, SkeletonElement} from "@/components/skeleton/Skeleton";
import {Avatar} from "@/components/avatar/Avatar";

interface SideBarProps {
    children: ReactNode;
    isLoading?: boolean;
}

interface SideBarItemProps {
    title: string;
    isSelected: boolean;
    icon?: ReactNode;
    onClick?: () => void;
}

interface SideBarCollapsibleProps {
    labelTitle: string;
    onPlusClick?: () => void;
    onPlusEnter?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onPlusLeave?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    items: any;
}

interface SideBarLabelProps {
    title: string;
}

interface SideBarOrganisationProps {
    organisationName: string;
    icon?: ReactNode;
}

interface SideBarProfileProps {
    onClick?: () => void;
    isLoading?: boolean;
    userName?: string;
}


const SideBarItem: React.FC<SideBarItemProps> = ({ title, icon, isSelected, onClick }) => {
    return (
        <div className={cn("w-full h-10 flex flex-row items-center text-sm text-zinc-500 dark:text-gray rounded-lg font-normal cursor-pointer " +
                "bg-zinc-100 dark:bg-black-light hover:bg-zinc-200 dark:hover:bg-dark-light hover:text-zinc-800 dark:hover:text-white truncate",
                {"bg-zinc-200 dark:bg-dark-light text-zinc-800 dark:text-white border border-zinc-300 dark:border-edge": isSelected})}
             onClick={onClick}
        >
            <div className={cn("m-2 ml-4 mr-2")}>
                {icon}
            </div>
            <p className={"m-2"}>
                {title}
            </p>
        </div>
    );
}

const SideBarCollapsible: React.FC<SideBarCollapsibleProps> = ({ labelTitle, items, onPlusClick, onPlusEnter, onPlusLeave }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={"py-10 pl-2 pr-4 space-y-1"}>
            <div className={"w-full flex flex-row items-center"}>
                <div
                    className={"w-full flex flex-row items-center justify-between p-2 pr-4 text-zinc-400 dark:text-marcador rounded-lg " +
                        "hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-dark cursor-pointer"}
                    onClick={() => setOpen(!open)}
                >
                    <div className={"flex flex-row space-x-2"}>
                        <span className={cn("text-xs pl-1")}>{labelTitle}</span>
                        {open ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
                    </div>
                </div>
                <div className={"p-2 text-zinc-400 dark:text-marcador hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-dark rounded-lg cursor-pointer"}
                     onClick={onPlusClick}
                     onMouseEnter={onPlusEnter}
                     onMouseLeave={onPlusLeave}
                >
                    <Plus size={16}/>
                </div>
            </div>

            {open &&
                <div className={"ml-6 pl-4 border-l border-zinc-300 dark:border-edge border-opacity-50"}>
                    {items.map((item: any) => (
                        <div key={item.name}
                             className={cn("w-full text-zinc-500 dark:text-gray px-2 py-2 text-sm rounded-lg cursor-pointer truncate " +
                                 "hover:bg-zinc-200 dark:hover:bg-dark hover:text-zinc-800 dark:hover:text-white")}
                        >
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

const SideBarLabel: React.FC<SideBarLabelProps> = ({title}) => {
    return (
        <span className={cn("text-zinc-400 dark:text-marcador text-xs px-1")}>{title}</span>
    );
}

const SideBarOrganisation: React.FC<SideBarOrganisationProps> = ({icon, organisationName}) => {
    return (
        <div className={"flex flex-row space-x-4 items-center mb-7 border-b border-zinc-300 dark:border-edge px-4 pb-3"}>
            {icon && icon}
            <span className={"text-zinc-800 dark:text-white text-3xl"}>{organisationName}</span>
        </div>
    );
}

const SideBarProfile: React.FC<SideBarProfileProps> = ({ onClick, isLoading, userName }) => {
    return (
        <div className={cn("group w-64 flex flex-row items-center justify-between cursor-pointer bg-zinc-100 dark:bg-black-light " +
                "border border-zinc-300 dark:border-edge rounded-lg hover:bg-zinc-200 dark:hover:bg-dark-light")}
             onClick={onClick}
        >
            {isLoading ?
                <Skeleton className={"w-max"}>
                    <SkeletonElement className={"m-2"} width={43} height={43}/>
                    <SkeletonColumn className={"items-start space-y-2 mr-0"}>
                        <SkeletonElement width={110} height={10}/>
                        <SkeletonElement width={80} height={10}/>
                    </SkeletonColumn>
                </Skeleton>
                :
                <div className={cn("flex flex-row items-center space-x-2 overflow-hidden")}>
                    <Avatar className={cn("p-2")} size={60} shape={"box"}/>
                    <span className={"text-sm truncate w-full"}>{userName || "Guest"}</span>
                </div>
            }

            <ChevronsUpDown
                className={cn("m-4 text-zinc-500 dark:text-gray group-hover:text-zinc-800 dark:group-hover:text-white")}/>
        </div>
    );
}

const SideBarSeperator: React.FC = () => {
    return (
        <div className={"border-b border-zinc-300 dark:border-edge -mx-4"}/>
    );
}

const SideBar: React.FC<SideBarProps> = ({ children, isLoading }) => {
    return (
        <div className={"w-max h-screen flex flex-col justify-between bg-zinc-100 dark:bg-black-light border-r border-zinc-300 dark:border-edge p-4 space-y-1"}>
            {React.Children.map(children, child => {
                if (React.isValidElement<SideBarProfileProps>(child)) {
                    return React.cloneElement(child, { isLoading: isLoading });
                }
                return child;
            })}
        </div>
    );
}

export {
    SideBar,
    SideBarItem,
    SideBarCollapsible,
    SideBarLabel,
    SideBarOrganisation,
    SideBarProfile,
    SideBarSeperator
}