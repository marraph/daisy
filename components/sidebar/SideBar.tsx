import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {cn} from "@/utils/cn";
import {ArrowLeftFromLine, ArrowRightFromLine, ChevronDown, ChevronRight, ChevronsUpDown, Plus} from "lucide-react";
import {Skeleton, SkeletonColumn, SkeletonElement} from "@/components/skeleton/Skeleton";
import {Avatar} from "@/components/avatar/Avatar";
import {useRouter} from "next/router";
import Link from "next/link";

interface NavigationContextType {
    currentPath: string;
    setCurrentPath: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const NavigationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [currentPath, setCurrentPath] = useState<string>('');

    return (
        <NavigationContext.Provider value={{ currentPath, setCurrentPath }}>
            {children}
        </NavigationContext.Provider>
    );
};

const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};



interface SideBarProps {
    children: ReactNode;
    isLoading?: boolean;
}

interface SideBarItemProps {
    title: string;
    icon?: ReactNode;
    href: string;
    onClick?: () => void;
    onMouseEnter?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseLeave?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    isCollapsed?: boolean;
}

interface SideBarCollapsibleProps {
    labelTitle: string;
    onPlusClick?: () => void;
    onPlusEnter?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onPlusLeave?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children?: ReactNode;
    icon?: ReactNode;
    isCollapsed?: boolean;
}

interface SideBarCollapsibleItemProps {
    title: string;
    onClick?: () => void;
    onMouseEnter?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseLeave?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface SideBarLabelProps {
    title: string;
    isCollapsed?: boolean;
}

interface SideBarOrganisationProps {
    organisationName: string;
    icon?: ReactNode;
    onClick?: () => void;
    onMouseEnter?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseLeave?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    isLoading?: boolean;
    isCollapsed?: boolean;
}

interface SideBarProfileProps {
    onClick?: () => void;
    onMouseEnter?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseLeave?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    isLoading?: boolean;
    userName?: string;
    isCollapsed?: boolean;
}

interface SideBarContainerProps {
    children: ReactNode;
    isCollapsed?: boolean;
}



const SideBarItem: React.FC<SideBarItemProps> = ({ title, icon, href, onClick, onMouseEnter, onMouseLeave, isCollapsed }) => {
    const { currentPath } = useNavigation();
    const isSelected = currentPath === href;

    return (
        <Link href={href} passHref>
            <div className={cn("w-full h-8 flex px-4 py-2 items-center rounded-lg font-normal cursor-pointer " +
                    "bg-zinc-100 dark:bg-black-light hover:bg-zinc-200 dark:hover:bg-dark-light truncate",
                    {"bg-zinc-200 dark:bg-dark-light text-zinc-800 dark:text-white border border-zinc-300 dark:border-edge": isSelected},
                    isCollapsed ? "justify-center px-2" : "flex-row space-x-4")}
                 onClick={onClick}
                 onMouseEnter={onMouseEnter}
                 onMouseLeave={onMouseLeave}
            >
                {icon}
                {!isCollapsed &&
                    <span className={"text-sm text-zinc-500 dark:text-gray hover:text-zinc-800 dark:hover:text-white"}>
                        {title}
                    </span>
                }
            </div>
        </Link>
    );
}

const SideBarCollapsible: React.FC<SideBarCollapsibleProps> = ({ labelTitle, children, onPlusClick, onPlusEnter, onPlusLeave, icon, isCollapsed }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={cn("-mx-2 space-y-1", isCollapsed && "hidden")}>
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
                    {icon || <Plus size={16}/>}
                </div>
            </div>

            {open &&
                <div className={"ml-6 pl-2 border-l border-zinc-300 dark:border-edge border-opacity-50"}>
                    {children}
                </div>
            }
        </div>
    );
}

const SideBarCollapsibleItem: React.FC<SideBarCollapsibleItemProps> = ({ title, onClick, onMouseEnter, onMouseLeave }) => {
    return (
        <div className={cn("w-full h-8 text-zinc-500 dark:text-gray px-3 py-1 text-sm rounded-lg cursor-pointer truncate " +
                "hover:bg-zinc-200 dark:hover:bg-dark hover:text-zinc-800 dark:hover:text-white")}
             onClick={onClick}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
        >
            <span>{title}</span>
        </div>
    );
}

const SideBarLabel: React.FC<SideBarLabelProps> = ({ title, isCollapsed }) => {
    return (
        <span className={cn("text-zinc-400 dark:text-marcador text-xs px-1", isCollapsed && "hidden")}>{title}</span>
    );
}

const SideBarOrganisation: React.FC<SideBarOrganisationProps> = ({ icon, organisationName, onClick, onMouseEnter, onMouseLeave, isLoading, isCollapsed }) => {
    return (
        <div
            className={cn("group w-full flex flex-row items-center justify-between cursor-pointer bg-zinc-100 dark:bg-black-light " +
                "border border-zinc-300 dark:border-edge rounded-lg hover:bg-zinc-200 dark:hover:bg-dark-light")}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isLoading ?
                <Skeleton className={"w-max"}>
                    <SkeletonElement className={"m-2"} width={10} height={10}/>
                    {!isCollapsed &&
                        <SkeletonElement width={110} height={10}/>
                    }
                </Skeleton>
                :
                <div className={"flex flex-col p-2 overflow-hidden"}>
                    {!isCollapsed &&
                        <span className={cn("text-zinc-400 dark:text-marcador text-xs")}>Workspace</span>
                    }
                    <div className={cn("flex flex-row items-center space-x-2", !isCollapsed && "space-x-2")}>
                        {icon}
                        {!isCollapsed &&
                            <span className={"text-zinc-800 dark:text-white text-sm truncate"}>
                                {organisationName || "Private Workspace"}
                            </span>
                        }
                    </div>
                </div>
            }

            {!isCollapsed &&
                <ChevronsUpDown size={16} className={"m-4 text-zinc-500 dark:text-gray group-hover:text-zinc-800 dark:group-hover:text-white"}/>
            }
        </div>
    );
}

const SideBarProfile: React.FC<SideBarProfileProps> = ({onClick, onMouseEnter, onMouseLeave, isLoading, userName, isCollapsed }) => {
    return (
        <div
            className={cn("group w-full flex flex-row items-center justify-between cursor-pointer bg-zinc-100 dark:bg-black-light " +
                "border border-zinc-300 dark:border-edge rounded-lg hover:bg-zinc-200 dark:hover:bg-dark-light")}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isLoading ?
                <Skeleton className={"w-max"}>
                    <SkeletonElement className={"m-2"} width={30} height={30}/>
                    {!isCollapsed &&
                        <SkeletonElement width={110} height={10}/>
                    }
                </Skeleton>
                :
                <div className={cn("flex flex-row items-center p-2 overflow-hidden", !isCollapsed && "space-x-2")}>
                    <Avatar size={30} shape={"box"} className={"rounded-lg"}/>
                    {!isCollapsed &&
                        <span className={"text-zinc-800 dark:text-white text-sm truncate"}>
                            {userName || "Guest"}
                        </span>
                    }
                </div>
            }

            {!isCollapsed &&
                <ChevronsUpDown size={16} className={cn("m-4 text-zinc-500 dark:text-gray group-hover:text-zinc-800 dark:group-hover:text-white", isCollapsed && "hidden")}/>
            }
        </div>
    );
}

const SideBarSeperator: React.FC = () => {
    return (
        <div className={"border-b border-zinc-300 dark:border-edge -mx-4"}/>
    );
}

const SideBarContainer: React.FC<SideBarContainerProps> = ({ children, isCollapsed }) => {
    return (
        <div className={"w-full h-full flex flex-col space-y-2"}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<SideBarItemProps | SideBarCollapsibleProps | SideBarLabelProps>(child)) {
                    return React.cloneElement(child, {
                        isCollapsed: isCollapsed,
                        key: `${child.type}-${isCollapsed}-${index}`
                    });
                }
            })}
        </div>
    );
}

const SideBar: React.FC<SideBarProps> = ({ children, isLoading }) => {
    const router = useRouter();
    const { setCurrentPath } = useNavigation();
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    useEffect(() => {
        setCurrentPath(router.pathname);
    }, [router.pathname, setCurrentPath]);

    return (
        <div className={"top-0 left-0 w-max h-screen flex flex-col justify-between p-4 space-y-4 " +
            "bg-zinc-100 dark:bg-black-light border-r border-zinc-300 dark:border-edge"}
        >
            <div className={"w-full flex justify-end text-zinc-500 dark:text-gray"}
                 onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? <ArrowRightFromLine size={20}/> : <ArrowLeftFromLine size={20}/> }
            </div>

            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<SideBarProfileProps | SideBarOrganisationProps>(child)) {
                    return React.cloneElement(child, {
                        isLoading: isLoading,
                        isCollapsed: isCollapsed,
                        key: `${child.type}-${isCollapsed}-${index}`
                    });
                }
                if (React.isValidElement<SideBarContainerProps>(child)) {
                    return React.cloneElement(child, {
                        isCollapsed: isCollapsed,
                        key: `${child.type}-${isCollapsed}-${index}`
                    });
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
    SideBarSeperator,
    SideBarContainer,
    SideBarCollapsibleItem,
    NavigationProvider,
    useNavigation
}