import React, {useEffect, useState} from "react";
import { Seperator } from "../seperator/Seperator";


interface ColorPickerProps {
    initialColor?: string;
    onChange: (color: string) => void;
    colors: string[];
    title?: string;
    customColor?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ initialColor, colors, onChange, title, customColor = "true" }) => {
    const [color, setColor] = useState<string>(initialColor || "#FFFFFF");

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
        onChange?.(e.target.value);
    };

    return (
        <div className={"flex flex-col p-2 space-y-4 rounded-lg bg-zinc-100 dark:bg-dark border border-zinc-300 dark:border-edge"}>
            {title &&
                <div className={"text-sm text-zinc-500 dark:text-gray space-y-2 px-2"}>
                    <span>{title}</span>
                    <Seperator className={"-mx-4"}/>
                </div>
            }
            <div className={"grid grid-cols-4 gap-4 px-2"}>
                {colors?.map((color) => (
                    <ColorBox
                        key={color}
                        color={color}
                        onClick={() => setColor(color)}
                    />
                ))}
            </div>

            {customColor &&
                <div className={"px-2"}>
                    <label className={"ml-0.5 block text-xs text-zinc-400 dark:text-marcador"}>Selected Color</label>
                    <input
                        type="color"
                        className={"w-full h-8 rounded-md bg-inherit appearance-none cursor-pointer"}
                        value={color}
                        onChange={e => handleColorChange(e)}
                    />
                </div>
            }
        </div>
    );
}

const ColorBox: React.FC<{ color: string, onClick: () => void }> = ({color, onClick}) => {
    return (
        <div
            className={"size-6 rounded-md cursor-pointer hover:scale-105"}
            style={{backgroundColor: color}}
            onClick={onClick}
        />
    );
}

export {ColorPicker};