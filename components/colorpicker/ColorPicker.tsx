import React, {useEffect, useState} from "react";


interface ColorPickerProps {
    initialColor?: string;
    onChange: (color: string) => void;
    preColors?: string[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({ initialColor, preColors, onChange }) => {
    const [color, setColor] = useState<string>(initialColor || "#FFFFFF");

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className={"flex flex-col p-4 space-y-4 rounded-lg bg-zinc-100 dark:bg-dark border border-zinc-300 dark:border-edge"}>
            <div className={"grid grid-cols-4 gap-4"}>
                {preColors?.map((preColor) => (
                    <ColorBox
                        key={preColor}
                        color={preColor}
                        onClick={() => setColor(preColor)}
                    />
                ))}
            </div>

            <div>
                <label className={"ml-0.5 block text-xs text-zinc-500 dark:text-gray"}>Selected Color</label>
                <input
                    type="color"
                    className={"w-full h-12 bg-inherit appearance-none cursor-pointer outline-amber-500"}
                    value={color}
                    onChange={e => handleColorChange(e)}
                />
            </div>
        </div>
    );
}

const ColorBox: React.FC<{ color: string, onClick: () => void }> = ({color, onClick}) => {
    return (
        <div
            className={"size-6 rounded-md cursor-pointer"}
            style={{backgroundColor: color}}
            onClick={onClick}
        />
    );
}

export { ColorPicker };