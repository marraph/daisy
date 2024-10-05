import React, {useEffect, useState} from "react";
import Picker from '@emoji-mart/react'

interface EmojiPickerProps {
    perLine?: number;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ perLine = 8  }) => {
    const [data, setData] = useState(null);

    const fetchEmojiData = async () => {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@emoji-mart/data')
        setData(response.json())
    }

    useEffect(() => {
        if (!data)
            fetchEmojiData().then(r => console.log(r));
    }, [data, fetchEmojiData()]);

    return (
        <Picker
            data={data}
            onEmojiSelect={console.log}
            perLine={perLine}
            set={"apple"}
            previewPosition={"none"}
            className={""}
        />
    );
}