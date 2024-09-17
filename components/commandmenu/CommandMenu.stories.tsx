import React, {useState} from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {CommandMenu, CommandMenuItemProps} from "@/components/commandmenu/CommandMenu";
import {
    File,
    Save,
    Trash2,
    Search,
    Settings,
    Upload,
    Download,
    Edit3,
    Eye,
    Copy,
    Folder,
    Plus,
    Minus,
    Bookmark,
    RefreshCw,
    CheckCircle,
    XCircle,
    Volume2,
    PlayCircle,
    PauseCircle,
    GitBranch
} from "lucide-react";

const meta: Meta<typeof CommandMenu> = {
    title: "Components/CommandMenu",
    component: CommandMenu,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CommandMenu>;

export const Default = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const openDialog = () => setIsDialogOpen(true)
    const closeDialog = () => setIsDialogOpen(false)

    const showItems: CommandMenuItemProps[] = [
        {
            id: 1,
            title: "Open File",
            description: "Open an existing file from your system",
            icon: <File size={20}/>,  // Lucide icon for file
            onClick: (e) => console.log("Open File clicked"),
            shortcut: "Ctrl+O",
            disabled: false,
            keywords: ["open", "file", "load"]
        },
        {
            id: 2,
            title: "Save File",
            description: "Save the current file",
            icon: <Save size={20} />,  // Lucide icon for save
            onClick: (e) => console.log("Save File clicked"),
            keywords: ["save", "file", "store"],
            disabled: false
        },
        {
            id: 3,
            title: "Delete Item",
            icon: <Trash2 size={20} />,  // Lucide icon for delete
            onClick: (e) => console.log("Delete clicked"),
            keywords: ["delete", "remove", "trash"],
            disabled: false
        },
        {
            id: 4,
            title: "Search",
            icon: <Search size={20} />,  // Lucide icon for search
            keywords: ["search", "find", "lookup"],
            disabled: false
        },
        {
            id: 5,
            title: "Settings",
            description: "Change system settings",
            icon: <Settings size={20} />,  // Lucide icon for settings
            onClick: (e) => console.log("Settings clicked"),
            shortcut: "Ctrl+,",
            disabled: false,
            keywords: ["settings", "preferences", "options"]
        }
    ];
    const commandMenuItems: CommandMenuItemProps[] = [
        {
            id: 1,
            title: "Open File",
            description: "Open an existing file from your system",
            icon: <File size={20} />,  // Lucide icon for file
            onClick: (e) => console.log("Open File clicked"),
            shortcut: "Ctrl+O",
            disabled: false,
            selected: false,
            keywords: ["open", "file", "load"]
        },
        {
            id: 2,
            title: "Save File",
            description: "Save the current file",
            icon: <Save size={20} />,  // Lucide icon for save
            onClick: (e) => console.log("Save File clicked"),
            keywords: ["save", "file", "store"],
            disabled: false
        },
        {
            id: 3,
            title: "Delete Item",
            icon: <Trash2 size={20} />,  // Lucide icon for delete
            onClick: (e) => console.log("Delete clicked"),
            selected: true,
            keywords: ["delete", "remove", "trash"],
            disabled: false
        },
        {
            id: 4,
            title: "Search",
            icon: <Search size={20} />,  // Lucide icon for search
            keywords: ["search", "find", "lookup"],
            disabled: false
        },
        {
            id: 5,
            title: "Settings",
            description: "Change system settings",
            icon: <Settings size={20} />,  // Lucide icon for settings
            onClick: (e) => console.log("Settings clicked"),
            shortcut: "Ctrl+,",
            disabled: false,
            keywords: ["settings", "preferences", "options"]
        },
        {
            id: 6,
            title: "Upload File",
            description: "Upload a file to the server",
            icon: <Upload size={20} />,
            onClick: (e) => console.log("Upload File clicked"),
            keywords: ["upload", "file", "server"],
            disabled: false
        },
        {
            id: 7,
            title: "Download File",
            description: "Download the selected file",
            icon: <Download size={20} />,
            onClick: (e) => console.log("Download clicked"),
            shortcut: "Ctrl+D",
            keywords: ["download", "file", "save"],
            disabled: false
        },
        {
            id: 8,
            title: "Edit Document",
            icon: <Edit3 size={20} />,
            onClick: (e) => console.log("Edit clicked"),
            keywords: ["edit", "document", "modify"],
            disabled: false
        },
        {
            id: 9,
            title: "View Details",
            icon: <Eye size={20} />,
            keywords: ["view", "details", "inspect"],
            disabled: false
        },
        {
            id: 10,
            title: "Copy",
            icon: <Copy size={20} />,
            onClick: (e) => console.log("Copy clicked"),
            shortcut: "Ctrl+C",
            keywords: ["copy", "duplicate"],
            disabled: false
        },
        {
            id: 11,
            title: "Paste",
            icon: <GitBranch size={20} />,
            keywords: ["paste", "insert"],
            disabled: false
        },
        {
            id: 12,
            title: "Create New Folder",
            description: "Create a new folder in the current directory",
            icon: <Folder size={20} />,
            onClick: (e) => console.log("New Folder clicked"),
            keywords: ["folder", "create", "new"],
            disabled: false
        },
        {
            id: 13,
            title: "Add Item",
            icon: <Plus size={20} />,
            onClick: (e) => console.log("Add clicked"),
            keywords: ["add", "create", "new"],
            disabled: false
        },
        {
            id: 14,
            title: "Remove Item",
            icon: <Minus size={20} />,
            keywords: ["remove", "delete", "subtract"],
            disabled: false
        },
        {
            id: 15,
            title: "Bookmark Page",
            icon: <Bookmark size={20} />,
            onClick: (e) => console.log("Bookmark clicked"),
            keywords: ["bookmark", "save", "page"],
            disabled: false
        },
        {
            id: 16,
            title: "Refresh Page",
            description: "Reload the current page",
            icon: <RefreshCw size={20} />,
            onClick: (e) => console.log("Refresh clicked"),
            shortcut: "F5",
            keywords: ["refresh", "reload", "update"],
            disabled: false
        },
        {
            id: 17,
            title: "Complete Task",
            description: "Mark the task as complete",
            icon: <CheckCircle size={20} />,
            keywords: ["complete", "task", "finish"],
            disabled: false
        },
        {
            id: 18,
            title: "Cancel Task",
            icon: <XCircle size={20} />,
            onClick: (e) => console.log("Cancel clicked"),
            keywords: ["cancel", "stop", "abort"],
            disabled: false
        },
        {
            id: 19,
            title: "Mute Sound",
            icon: <Volume2 size={20} />,
            keywords: ["mute", "sound", "audio"],
            disabled: false
        },
        {
            id: 20,
            title: "Play Video",
            description: "Start playing the video",
            icon: <PlayCircle size={20} />,
            onClick: (e) => console.log("Play clicked"),
            keywords: ["play", "video", "start"],
            disabled: false
        },
        {
            id: 21,
            title: "Pause Video",
            icon: <PauseCircle size={20} />,
            keywords: ["pause", "video", "stop"],
            disabled: false
        },
        {
            id: 22,
            title: "Open Folder",
            icon: <Folder size={20} />,
            description: "Open the selected folder",
            keywords: ["open", "folder", "directory"],
            disabled: false
        },
        {
            id: 23,
            title: "Rename Item",
            icon: <Edit3 size={20} />,
            onClick: (e) => console.log("Rename clicked"),
            keywords: ["rename", "edit", "change"],
            disabled: false
        },
        {
            id: 24,
            title: "Search Documents",
            icon: <Search size={20} />,
            description: "Search for documents",
            keywords: ["search", "documents", "find"],
            disabled: false
        },
        {
            id: 25,
            title: "Settings",
            icon: <Settings size={20} />,
            onClick: (e) => console.log("Settings clicked"),
            keywords: ["settings", "preferences", "options"],
            disabled: false
        }
    ];

    return (
        <>
            <CommandMenu
                isOpen={isDialogOpen}
                onClose={closeDialog}
                animation={"fade"}
                showItems={showItems}
                items={commandMenuItems}
            >

            </CommandMenu>

            <button className={"bg-black text-white p-2 text-base rounded-lg border border-edge"}
                    onClick={() => openDialog()}
                    type={"button"}
            >
                Dialog
            </button>
        </>
    );
};