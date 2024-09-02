import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {cn} from "@/utils/cn";
import {ArrowLeftFromLine, ArrowRightFromLine, ChevronDown, ChevronRight, ChevronsUpDown, Plus} from "lucide-react";
import {Skeleton, SkeletonElement} from "@/components/skeleton/Skeleton";
import {Avatar} from "@/components/avatar/Avatar";
import {useRouter} from "next/router";
import Link from "next/link";
import {useMediaQuery} from "@/hooks/useMediaQuery";

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
            <div className={cn("w-full h-8 flex py-2 items-center rounded-lg font-normal cursor-pointer " +
                    "bg-zinc-100 dark:bg-black-light hover:bg-zinc-200 dark:hover:bg-dark-light truncate text-sm " +
                    "text-zinc-500 dark:text-gray hover:text-zinc-800 dark:hover:text-white",
                    {"bg-zinc-200 dark:bg-dark-light text-zinc-800 dark:text-white border border-zinc-300 dark:border-edge": isSelected},
                    isCollapsed ? "justify-center" : "flex-row space-x-4 px-4")}
                 onClick={onClick}
                 onMouseEnter={onMouseEnter}
                 onMouseLeave={onMouseLeave}
            >
                {icon}
                {!isCollapsed &&
                    <span>{title}</span>
                }
            </div>
        </Link>
    );
}

const SideBarCollapsible: React.FC<SideBarCollapsibleProps> = ({ labelTitle, children, onPlusClick, onPlusEnter, onPlusLeave, icon, isCollapsed }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={cn("-ml-2 space-y-1", isCollapsed && "hidden")}>
            <div className={"w-full flex flex-row items-center"}>
                <div
                    className={"w-full flex flex-row items-center justify-between p-2 pr-4 text-zinc-400 dark:text-marcador rounded-lg " +
                        "hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-dark cursor-pointer"}
                    onClick={() => setOpen(!open)}
                >
                    <div className={"flex flex-row items-center space-x-2"}>
                        <span className={cn("text-xs pl-1")}>{labelTitle}</span>
                        {open ? <ChevronDown size={14} className={"mt-0.5"}/> : <ChevronRight size={14} className={"mt-0.5"}/>}
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
        <div className={cn("w-full h-8 flex items-center text-zinc-500 dark:text-gray px-3 py-1 text-sm rounded-lg cursor-pointer truncate " +
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
        <>
            {isCollapsed ?
                <div className={"w-full flex items-center justify-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-dark-light size-10 rounded-lg"}
                     onClick={onClick}
                     onMouseEnter={onMouseEnter}
                     onMouseLeave={onMouseLeave}
                >
                    {icon}
                </div>
                :
                <div
                    className={cn("group flex flex-row items-center justify-between cursor-pointer bg-zinc-100 dark:bg-black-light " +
                        "rounded-lg w-full border border-zinc-300 dark:border-edge hover:bg-zinc-200 dark:hover:bg-dark-light")}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {isLoading ?
                        <Skeleton className={"w-max"}>
                            <SkeletonElement className={"m-2"} width={10} height={10}/>
                            <SkeletonElement width={110} height={10}/>
                        </Skeleton>
                        :
                        <div className={cn("flex flex-col space-y-0.5 overflow-hidden p-2")}>
                            <span className={cn("text-zinc-400 dark:text-marcador text-xs")}>Workspace</span>
                            <div className={cn("flex flex-row items-center space-x-2")}>
                                {icon}
                                <span className={"text-zinc-800 dark:text-white text-xs font-medium truncate"}>
                                    {organisationName || "Private Workspace"}
                                </span>
                            </div>
                        </div>
                    }
                    <ChevronsUpDown size={16} className={"m-2 text-zinc-500 dark:text-gray group-hover:text-zinc-800 dark:group-hover:text-white"}/>
                </div>
            }
        </>
    );
}

const SideBarProfile: React.FC<SideBarProfileProps> = ({onClick, onMouseEnter, onMouseLeave, isLoading, userName, isCollapsed }) => {
    return (
        <>
            {isCollapsed ?
                <div className={"w-full flex justify-center cursor-pointer"}
                     onClick={onClick}
                     onMouseEnter={onMouseEnter}
                     onMouseLeave={onMouseLeave}
                >
                    <Avatar size={24} shape={"box"} className={"rounded-lg my-2"}/>
                </div>
                :
                <div
                    className={cn("group w-full flex flex-row items-center justify-between cursor-pointer bg-zinc-100 dark:bg-black-light " +
                        "rounded-lg hover:bg-zinc-200 dark:hover:bg-dark-light border border-zinc-300 dark:border-edge")}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {isLoading ?
                        <Skeleton className={"w-max"}>
                            <SkeletonElement className={"m-2"} width={30} height={30}/>
                            <SkeletonElement width={110} height={10}/>
                        </Skeleton>
                        :
                        <div
                            className={cn("flex flex-row items-center overflow-hidden space-x-2 p-2")}>
                            <Avatar size={24} shape={"box"} className={"rounded-lg"}/>
                            <span className={"text-zinc-800 dark:text-white text-xs font-medium truncate"}>
                                {userName || "Guest"}
                            </span>
                        </div>
                    }
                    <ChevronsUpDown size={16} className={cn("m-2 text-zinc-500 dark:text-gray group-hover:text-zinc-800 dark:group-hover:text-white")}/>
                </div>
            }
        </>
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
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const { setCurrentPath } = useNavigation();
    const isMobile = useMediaQuery('(max-width: 1280px)');

    useEffect(() => {
        setCurrentPath(router.pathname);
    }, [router.pathname, setCurrentPath]);

    useEffect(() => {
        setIsCollapsed(isMobile);
    }, [isMobile]);

    return (
        <div className={cn("top-0 left-0 w-max h-screen flex flex-col justify-between p-4 space-y-4 " +
            "bg-zinc-100 dark:bg-black-light border-r border-zinc-300 dark:border-edge", !isCollapsed && "min-w-60")}
        >
            <div className={"w-full flex justify-end"}>
                <div className={"w-max p-1 text-zinc-500 dark:text-gray hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-dark-light " +
                        "rounded-lg cursor-pointer"}
                     onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? <ArrowRightFromLine size={16}/> : <ArrowLeftFromLine size={16}/>}
                </div>
            </div>

            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<SideBarProfileProps | SideBarOrganisationProps>(child)) {
                    return React.cloneElement(child, {
                        isLoading: isLoading,
                        isCollapsed: isCollapsed,
                        key: `${child.type}-${isCollapsed}-${index}`,
                        onClick: isCollapsed ? () => setIsCollapsed(false) : child.props.onClick,
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